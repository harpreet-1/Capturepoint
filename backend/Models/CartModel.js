const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
  },
  { versionKey: false, timestamps: true }
);

const CartModel = mongoose.model("Cart", cartItemSchema);
module.exports = CartModel;
