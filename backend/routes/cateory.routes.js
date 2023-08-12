const express = require("express");
const CategoryModel = require("../Models/CategoryModel");
const categoryRouter = express.Router();

//(^_^)=======================    Add new  Product       =========================

categoryRouter.post("/add", async (req, res) => {
  try {
    const product = await CategoryModel.create(req.body);
    res.json({ message: "category added successfully" });
  } catch (error) {
    console.log("error from adding new category ********************\n", error);
    res.status(500).json({ message: "error in adding new category" });
  }
});

//(^_^)=======================  get products with filter    =========================
categoryRouter.get("/all", async (req, res) => {
  try {
    const products = await CategoryModel.find();
    res.json({ products });
  } catch (error) {
    console.log("error from geting all category ********************\n", error);
    res.status(500).json({ message: "error in geting all category" });
  }
});

module.exports = categoryRouter;
