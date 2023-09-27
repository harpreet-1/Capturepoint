const express = require("express");
const validateProduct = require("../middleware/productDetailsValidation");
const ProductModel = require("../Models/ProductsModel");
const ProductFilterQuery = require("../middleware/ProductFilterQuery");
const productRouter = express.Router();

//(^_^)=======================  get products with filter    =========================
productRouter.get("/all", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json({ products });
  } catch (error) {
    console.log("error from geting all products ********************\n", error);
    res.status(500).json({ message: "error in geting all product" });
  }
});

productRouter.get("/search", ProductFilterQuery, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "-createdAt"; // Added sort order, default to "asc"

  // Calculate total count of products

  // Execute pipeline to get products
  console.log(req.searchQuery?.$or);
  try {
    const products = await ProductModel.find(req.searchQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("error from /products/search", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//(^_^)=======================    Get Product with id      =========================

productRouter.get("/byid/:id", async (req, res) => {
  try {
    const products = await ProductModel.findById(req.params.id);
    return res.status(200).json({ status: true, products });
  } catch (error) {
    console.log("error from get product /byid/:id ");
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong ! Try again later .",
    });
  }
});

//(^_^)=======================    Update Products       =========================

// const updateProduct = async (req, res) => {
//   try {
//     const product = await productModel.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     );
//     res.json({ message: "product updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//(^_^)=======================    Delete Products       =========================

// const deleteProduct = async (req, res) => {
//   try {
//     const product = await productModel.findByIdAndDelete(req.params.id);
//     res.json({ message: "product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// productRouter.get("/", getProducts);
// productRouter.get("/:id", getProduct);

//(^_^)======================= Admin   Authorization       =========================

// productRouter.use(adminAuthorization);

//(^_^)=======================    Routes handling    =========================

// productRouter.route("/:id").patch(updateProduct).delete(deleteProduct);

//(^_^)=======================    Routes handling    =========================

module.exports = productRouter;
