const express = require("express");
const passport = require("../googleAuth.js/auth");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const googleRouter = express.Router();
googleRouter.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleRouter.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  async (req, res) => {
    console.log("Google callback triggered");
    let { email, name: username } = req.user._json;
    console.log(email);
    let existUser = await UserModel.findOne({ email });
    let user = {};
    if (existUser) {
      user = {
        username: existUser.username,
        email,
        id: existUser._id,
      };
    } else {
      let password = `${Math.floor(Math.random() * 19999)}`;
      const hashedPassword = await bcrypt.hash(password, 5);
      console.log(hashedPassword);
      let newUser = await UserModel.create({
        email,
        password: hashedPassword,
        username,
      });

      user = {
        username,
        email,
        id: newUser._id,
      };
    }
    console.log("google se aaya---->", user);
    // Create a JWT with user data
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Redirect the user to your frontend URL
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

module.exports = googleRouter;
