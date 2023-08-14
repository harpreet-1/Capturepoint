// const express = require("express");

const cors = require("cors");
const { connection } = require("./server");
var morgan = require("morgan");
require("dotenv").config();

const { usersRouter } = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/cateory.routes");
const passport = require("./googleAuth.js/auth");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req.profile, req.user);
  res.json({ message: "hello from server" });
});

app.get("/login", (req, res) => {
  res.json({ message: "something went wrong" });
});
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    console.log("Google callback triggered");
    console.log("Authenticated user details:", req.profile, req.user);
    res.send("login success");
  }
);

app.listen(8080, () => {
  connection();
  console.log("server st at 8080");
});
