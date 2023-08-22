const { authorization } = require("../middleware/authorization");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const orderRouter = express.Router();

const checkLogin = require("../middleware/checkLogin");
const OrderModel = require("../Models/OrderModel");
const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductsModel");

// confirm order *********

orderRouter.post("/confirm/", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    const { products, orderTotal, shippingAddress } = req.body;

    const newOrderItem = await OrderModel.create({
      user: userId,
      products,
      orderTotal,
      shippingAddress,
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
    const orders = await OrderModel.find({ user: userId })
      .populate({
        path: "products.product",
        model: ProductModel,
        select: "name price images description category brand stockQuantity",
      })
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
orderRouter.get("/check-in-order/:productId", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // Check if the product is already in the order for the user

    const existingOrderItem = await OrderModel.findOne({
      userId,
      productId,
    });

    if (existingOrderItem) {
      return res.json({
        message: "Product is already in the order.",
        existingOrderItem,
      });
    }
    return res.json({
      message: "Product is not in the order.",
      existingOrderItem,
    });
  } catch (error) {
    console.log(
      "*********error from/check-in-order/:productId************",
      error
    );
    res.status(500).json({ error: "internal server error." });
  }
});

orderRouter.post("/update-order-quantity/:id", checkLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    // Check if the product is already in the order for the user

    const updatedProduct = await OrderModel.findByIdAndUpdate(id, {
      quantity,
    });

    return res.json({
      message: "Product Quantity updated.",
      updatedProduct,
    });
  } catch (error) {
    console.log(
      "*********error from/order/update/:productId************",
      error
    );
    res.status(500).json({ error: "internal server error." });
  }
});
orderRouter.delete("/delete/:id", checkLogin, async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the product is already in the order for the user

    const updatedProduct = await OrderModel.findByIdAndDelete(id);

    return res.json({
      message: "Product  deleted.",
    });
  } catch (error) {
    console.log("*********error from/order/delete/:id************", error);
    res.status(500).json({ error: "internal server error." });
  }
});

module.exports = orderRouter;
