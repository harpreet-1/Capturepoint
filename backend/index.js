const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const { connection } = require("./server");
var morgan = require("morgan");
require("dotenv").config();

const { usersRouter } = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/cateory.routes");
const passport = require("./googleAuth.js/auth");
const googleRouter = require("./googleAuth.js/google.routes");
const session = require("express-session");

app.get("/", (req, res) => {
  console.log(req.profile, req.user);
  res.json({ message: "hello from server" });
});

app.get("/login", (req, res) => {
  res.json({ message: "something went wrong" });
});

app.get("/islogin", (req, res) => {
  console.log(req.cookies.authToken);
  res.send("ok");
});

app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/auth/google", googleRouter);

app.listen(8080, () => {
  connection();
  console.log("server st at 8080");
});
