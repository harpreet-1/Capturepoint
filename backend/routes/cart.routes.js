const { authorization } = require("../middleware/authorization");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const cartRouter = express.Router();
const CartModel = require("../Models/CartModel");
const checkLogin = require("../middleware/checkLogin");

// GET /cart/:userId
cartRouter.get("/my-cart", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const pipeline = [
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products", // Collection name for products
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 1,
          productId: "$product._id",
          name: "$product.name",
          price: "$product.price",
          quantity: 1,
          description: "$product.description",
          category: "$product.category",
          images: "$product.images",
          brand: "$product.brand",
          brastockQuantitynd: "$product.brastockQuantitynd",

          itemTotal: { $multiply: ["$quantity", "$product.price"] },
        },
      },
      {
        $group: {
          _id: null,
          cartItems: { $push: "$$ROOT" },
          totalAmount: { $sum: "$itemTotal" },
        },
      },
    ];

    const result = await CartModel.aggregate(pipeline);

    res.status(200).json(result);
  } catch (error) {
    console.log("*********error from/my-cart************", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a product to the cart
cartRouter.get("/check-in-cart/:productId", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // Check if the product is already in the cart for the user

    const existingCartItem = await CartModel.findOne({
      userId,
      productId,
    });

    if (existingCartItem) {
      return res.json({
        message: "Product is already in the cart.",
        existingCartItem,
      });
    }
    return res.json({
      message: "Product is not in the cart.",
      existingCartItem,
    });
  } catch (error) {
    console.log(
      "*********error from/check-in-cart/:productId************",
      error
    );
    res.status(500).json({ error: "internal server error." });
  }
});

cartRouter.post("/add-to-cart/", checkLogin, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Check if the product is already in the cart for the user

    const existingCartItem = await CartModel.findOne({
      userId,
      productId,
    });
    if (existingCartItem && existingCartItem.quantity === quantity) {
      return res.status(200).json({
        message: "Product is already in the cart.",
        existingCartItem,
      });
    }
    if (existingCartItem && existingCartItem.quantity !== quantity) {
      existingCartItem.quantity = quantity;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Product quantity updated.",
        existingCartItem,
      });
    }
    const newCartItem = await CartModel.create({
      userId,
      productId,
      quantity,
    });
    res.status(201).json({ message: "Product added to cart.", newCartItem });
  } catch (error) {
    console.log("*********error from add-to-cart ************", error);
    res.status(500).json({ error: "internal server error." });
  }
});

cartRouter.post("/update-cart-quantity/:id", checkLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    // Check if the product is already in the cart for the user

    const updatedProduct = await CartModel.findByIdAndUpdate(id, {
      quantity,
    });

    return res.json({
      message: "Product Quantity updated.",
      updatedProduct,
    });
  } catch (error) {
    console.log(
      "*********error from/cart/update/:productId************",
      error
    );
    res.status(500).json({ error: "internal server error." });
  }
});
cartRouter.delete("/delete/:id", checkLogin, async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the product is already in the cart for the user

    const updatedProduct = await CartModel.findByIdAndDelete(id);

    return res.json({
      message: "Product  deleted.",
    });
  } catch (error) {
    console.log("*********error from/cart/delete/:id************", error);
    res.status(500).json({ error: "internal server error." });
  }
});

module.exports = cartRouter;
