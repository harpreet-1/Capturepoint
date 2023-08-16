const { authorization } = require("../middleware/authorization");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const cartRouter = express.Router();
const CartModel = require("../Models/CartModel");
const checkLogin = require("../middleware/checkLogin");

// const deletecart = async (req, res) => {
//   try {
//     const cart = await CartModel.findByIdAndDelete(req.params.id);
//     res.json({ message: "cart deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getcart = async (req, res) => {
  try {
    const carts = await CartModel.find({ user: req.user.id }).populate(
      "productId"
    );
    res.json(carts);
  } catch (error) {
    console.log("*********error from  geting cart products************", error);
    res.status(500).json({ message: "internal server error" });
  }
};

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

cartRouter.use(authorization);

cartRouter.get("/", checkLogin, getcart);
// cartRouter.post("/create", createcart);
// cartRouter.patch("/update", updatecart);
// cartRouter.delete("/delete", deletecart);

module.exports = cartRouter;
