const express = require("express");
const cors = require("cors");
const { connection } = require("./server");
var morgan = require("morgan");
require("dotenv").config();

const { usersRouter } = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/cateory.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);

app.listen(8080, () => {
  connection();
  console.log("server st at 8080");
});
