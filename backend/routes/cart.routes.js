const { authorization } = require("../middleware/authorization");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const cartRouter = express.Router();
const CartModel = require("../Models/CartModel");
const checkLogin = require("../middleware/checkLogin");
const ProductModel = require("../Models/ProductsModel");

cartRouter.use(checkLogin);

// GET  cart item for specific user

cartRouter.get("/my-cart", async (req, res) => {
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
          stockQuantity: "$product.stockQuantity",

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
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route to check a product in the cart for specific user
cartRouter.get("/check-in-cart/:productId", async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // Check if the product is already in the cart for the user

    const existingCartItem = await CartModel.findOne({
      userId,
      productId,
    }).populate("productId");

    if (existingCartItem) {
      return res.json({
        success: true,
        message: "Product is already in the cart.",
        existingCartItem,
      });
    }
    return res.json({
      message: "Product is not in the cart.",
      existingCartItem,
      success: false,
    });
  } catch (error) {
    console.log(
      "*********error from/check-in-cart/:productId************",
      error
    );
    res.status(500).json({ success: false, error: "internal server error." });
  }
});
// Route to add a product to the cart
cartRouter.post("/add-to-cart/", async (req, res) => {
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
        success: false,
        message: "Product is already in the cart.",
        existingCartItem,
      });
    }
    if (existingCartItem && existingCartItem.quantity !== quantity) {
      existingCartItem.quantity = quantity;
      await existingCartItem.save();
      return res.status(200).json({
        success: true,
        message: "Product quantity updated.",
        existingCartItem,
      });
    }

    const product = await ProductModel.findById(productId);
    if (product) {
      if (product.stockQuantity < quantity) {
        return res.status(200).json({
          success: false,
          maxQuantity: product.stockQuantity,
          message: `Only ${product.stockQuantity} Iteam are available in stock. `,
        });
      }
      product.stockQuantity -= quantity;
      await product.save();
    }
    const newCartItem = await CartModel.create({
      userId,
      productId,
      quantity,
    });

    res
      .status(201)
      .json({ success: true, message: "Product added to cart.", newCartItem });
  } catch (error) {
    console.log("*********error from add-to-cart ************", error);
    res.status(500).json({ success: false, error: "internal server error." });
  }
});
// Route to update a product to the cart ( by mistake route is post it should be patch )
cartRouter.post("/update-cart-quantity/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, productId, oldQuantity } = req.body;
    console.log(req.body);

    // validation request********
    if (!quantity || !productId || !oldQuantity) {
      return res
        .status(400)
        .json({ success: false, message: "please provide all details" });
    }

    const product = await ProductModel.findById(productId);

    //  product in store  check ********
    if (!product || (!product.stockQuantity && quantity > oldQuantity)) {
      console.log(product);
      return res.status(200).json({
        success: false,
        message: `Product is out of stock `,
      });
    }
    // same quantity check********
    if (quantity === oldQuantity) {
      return res.status(400).json({ success: false, message: "Updated" });
    }

    // req for decrease quantity********
    if (quantity < oldQuantity) {
      product.stockQuantity += oldQuantity - quantity;
      await product.save();
    } else {
      let updatedQuantity = quantity - oldQuantity;
      if (product.stockQuantity < updatedQuantity) {
        return res.status(200).json({
          success: false,
          message: `Only ${product.stockQuantity} more iteams available in stock. `,
          maxQuantity: oldQuantity + product.stockQuantity,
        });
      }
      product.stockQuantity -= updatedQuantity;
      await product.save();
    }
    const updatedProduct = await CartModel.findByIdAndUpdate(id, {
      quantity,
    });

    return res.json({
      success: true,
      message: "Product Quantity updated.",
      newQuantity: quantity,
    });
  } catch (error) {
    console.log(
      "*********error from/cart/update/:productId************",
      error
    );
    res.status(500).json({ success: false, error: "internal server error." });
  }
});
// Route to delete a product to the cart
cartRouter.delete("/delete/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    const cartItem = await CartModel.findById(cartId);
    const product = await ProductModel.findById(cartItem.productId);

    // updating product quantity in stock
    product.stockQuantity += cartItem.quantity;
    product.save();

    // delete cart
    const deleted = await CartModel.findByIdAndDelete(cartId);
    // res.status(204).send();
    return res.status(200).json({
      success: true,
      message: "Product  deleted.",
    });
  } catch (error) {
    console.log("*********error from/cart/delete/:id************", error);
    res.status(500).json({ success: false, error: "internal server error." });
  }
});

module.exports = cartRouter;
