const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authorization } = require("../middleware/authorization");
const UserModel = require("../Models/userModel");

const usersRouter = express.Router();

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const isValidEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};
const registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        status: "error",
        message:
          "Registration failed. Please provide required details " + !email
            ? "email"
            : !password
            ? "password"
            : "username",
      });
    }
    if (!isValidEmail(email)) {
      return "Please provide a valid email address";
    }
    const user = await UserModel.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "user alredy exists please login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { user: { id: newUser._id, username, email } },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Congratulations! You have successfully registered.",
      user: { username, email: email, userId: newUser._id },
      token: token,
    });
  } catch (error) {
    console.log(
      "*******************error from user register**********************",
      error
    );
    return res.status(400).json({
      status: "error",
      message: "user alredy exists please login",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        { user: { id: user._id, username: user.username, email } },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "3d",
        }
      );
      return res.status(200).json({
        status: "success",
        message: "Login Successful",
        user: { username: user.username, email, userId: user._id },
        token: token,
      });
    }
  } catch (error) {
    console.log(
      "*******************error from user login**********************",
      error
    );
    return res.status(400).json({
      status: "error",
      message: "Login failed",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);
usersRouter.get("/", getUsers);
// usersRouter.use(authorization);

// usersRouter.patch("/update/:id", updateUser);
// usersRouter.delete("/delete/:id", deleteUser);

module.exports = { usersRouter };
