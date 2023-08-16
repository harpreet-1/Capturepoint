const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { connection } = require("./server");
var morgan = require("morgan");
require("dotenv").config();
const { usersRouter } = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/cateory.routes");
const passport = require("./googleAuth.js/auth");
const googleRouter = require("./googleAuth.js/google.routes");
const checkLogin = require("./middleware/checkLogin");
const cartRouter = require("./routes/cart.routes");

app.get("/", (req, res) => {
  res.json({ message: "hello from new server" });
});

app.get("/login", (req, res) => {
  res.json({ message: "something went wrong" });
});

app.get("/islogin", checkLogin, (req, res) => {
  res.json(req.user);
});

app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/auth/google", googleRouter);

app.listen(8080, () => {
  connection();
  console.log("server st at 8080");
});
