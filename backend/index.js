const express = require("express");
const cors = require("cors");
const { connection } = require("./server");

require("dotenv").config();

const { usersRouter } = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});
app.use("/users", usersRouter);

app.listen(8080, () => {
  connection();
  console.log("server st at 8080");
});
