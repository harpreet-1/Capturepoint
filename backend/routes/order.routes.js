const { authorization } = require("../middleware/authorization");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const orderRouter = express.Router();
const moment = require("moment-timezone");
const checkLogin = require("../middleware/checkLogin");
const OrderModel = require("../Models/OrderModel");
const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductsModel");

// confirm order *********

orderRouter.post("/confirm/", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    const { products, orderTotal, shippingAddress } = req.body;
    let orderDate = moment(new Date())
      .tz("Asia/Kolkata")
      .format("dddd, YYYY-MM-DD HH:mm");
    const deliveryDate = moment(orderDate, "dddd, YYYY-MM-DD HH:mm")
      .add(4, "days")
      .format("dddd, YYYY-MM-DD HH:mm");
    const newOrderItem = await OrderModel.create({
      user: userId,
      products,
      orderTotal,
      shippingAddress,
      orderDate,
      deliveryDate,
    });
    if (newOrderItem) {
      let deleted = await CartModel.deleteMany({ userId });
      console.log(deleted);
    }
    res.status(201).json({ message: "order book successfull.", newOrderItem });
  } catch (error) {
    console.log("*********error from confirm order ************", error);
    res.status(500).json({ error: "internal server error." });
  }
});

// get products deatils for order booking

orderRouter.get("/my-products", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    const formattedCartItems = await CartModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products", // Collection name for products
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 0,
          product: "$productDetails._id",
          quantity: 1,
          price: "$productDetails.price",
        },
      },
    ]);

    res.json(formattedCartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get order details for a specific user
orderRouter.get("/my", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch orders for the specific user from the database
    const orders = await OrderModel.find({
      user: userId,
      "products.cancelled": false,
    })
      .populate({
        path: "products.product",
        model: ProductModel,
        select: "name price images description category brand stockQuantity",
      })
      .sort("-createdAt")
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No Orders Yet.", orders });
    }

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Route to add a product to the order

orderRouter.patch("/cancel-product/:orderId/:productId", async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const product = order.products.find(
      (prod) => prod._id.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    // Calculate the quantity to restore
    const quantityToRestore = product.quantity;

    // Update the cancelled status of the product
    product.cancelled = true;

    await order.save();

    // Update the product's stock quantity
    await ProductModel.findByIdAndUpdate(product.product._id, {
      $inc: { stockQuantity: quantityToRestore },
    });

    res.status(200).json({ message: "Product cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = orderRouter;
