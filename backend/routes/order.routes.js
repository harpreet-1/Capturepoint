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

    const orders = await OrderModel.find({
      products: {
        $elemMatch: {
          cancelled: false,
        },
      },
      "products.cancelled": false,
      user: userId,
    })
      .populate({
        path: "products.product",
        model: ProductModel,
        select: "name price images",
      })
      .sort("-createdAt")
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No Orders Yet.", orders });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// Route to get order details for a specific user with id
orderRouter.get("/single/:id", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await OrderModel.findOne({
      _id: req.params.id,
      products: {
        $elemMatch: {
          cancelled: false,
        },
      },
      user: userId,
    })
      .populate({
        path: "products.product",
        model: ProductModel,
        select: "name price images",
      })
      .sort("-createdAt")
      .exec();

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

orderRouter.patch("/cancel-product/:orderId/:productId", async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }
    if (order.status != "Pending" || order.status != "Processing") {
      return res
        .status(404)
        .json({ status: false, message: "Order can not be canceled !" });
    }

    const product = order.products.find(
      (prod) => prod._id.toString() === productId
    );

    if (!product || product.cancelled) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found in order" });
    }

    // Calculate the quantity to restore
    const quantityToRestore = product.quantity;

    // Update the cancelled status of the product
    product.cancelled = true;
    order.orderTotal -= Math.round(product.price * quantityToRestore);

    await order.save();

    // Update the product's stock quantity
    await ProductModel.findByIdAndUpdate(product.product._id, {
      $inc: { stockQuantity: quantityToRestore },
    });

    res
      .status(200)
      .json({ status: true, message: "Product cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "An error occurred" });
  }
});

module.exports = orderRouter;
