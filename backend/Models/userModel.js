const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  mobile: Number,
  address: String,
  pincode: Number,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
