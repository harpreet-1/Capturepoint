const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  mobile: { type: Number },
  password: { type: String, required: true },
  address: String,
  pincode: Number,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
