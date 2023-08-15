const express = require("express");
const passport = require("../googleAuth.js/auth");
const jwt = require("jsonwebtoken");

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
  (req, res) => {
    console.log("Google callback triggered");

    const secretKey = "your-secret-key"; // Replace with your secret key
    const user = {
      id: "user123",
      name: "John Doe",
    };
    // Create a JWT with user data
    const token = jwt.sign(user, "secretKey", { expiresIn: "1h" });

    // Set the token as an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    }); // 1 hour expiration

    // Redirect the user to your frontend URL
    res.redirect("http://localhost:3000");
  }
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  // Save the user's unique identifier (e.g., Google profile ID) in the session
  console.log("*****************from serializer*************", user);
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  console.log("*****************from deserializer*************", id);
  // Fetch the user's data based on the saved identifier and return it
  try {
    const user = await getUserById(id); // Replace with your database logic
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = googleRouter;
