const express = require("express");
const validateProduct = require("../middleware/productDetailsValidation");
const ProductModel = require("../Models/ProductsModel");
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

productRouter.get("/search", async (req, res) => {
  const searchText = req.query.search;
  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);
  const minRating = parseFloat(req.query.minRating);
  const category = req.query.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortField = req.query.sortField; // Added sort field
  const sortOrder = req.query.sortOrder || "asc"; // Added sort order, default to "asc"

  try {
    let pipeline = [
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          images: 1,
          category: 1,
          brand: 1,
          stockQuantity: 1,
          createdAt: 1,
          avgRating: { $avg: "$ratings.value" },
        },
      },
    ];

    if (searchText) {
      const regexSearch = new RegExp(searchText, "i");
      pipeline.unshift({
        $match: {
          $or: [
            { name: regexSearch },
            { description: regexSearch },
            { brand: regexSearch },
          ],
        },
      });
    }

    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      const priceFilter = {};
      if (!isNaN(minPrice)) {
        priceFilter.$gte = minPrice;
      }
      if (!isNaN(maxPrice)) {
        priceFilter.$lte = maxPrice;
      }
      pipeline.push({
        $match: { price: priceFilter },
      });
    }

    if (!isNaN(minRating)) {
      pipeline.push({
        $match: { avgRating: { $gte: minRating } },
      });
    }

    if (category) {
      pipeline.push({
        $match: { category: category },
      });
    }

    // Sort the results
    if (sortField) {
      const sortOrderValue = sortOrder === "desc" ? -1 : 1;
      const sortStage = {
        $sort: {
          [sortField]: sortOrderValue,
        },
      };
      pipeline.push(sortStage);
    }

    // Calculate total count of products
    const totalCountPipeline = [...pipeline];
    totalCountPipeline.push({
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    });

    // Execute pipeline to get products
    const productsWithAvgRating = await ProductModel.aggregate(pipeline)
      .skip((page - 1) * limit)
      .limit(limit);

    // Execute pipeline to get total count
    const totalCount = await ProductModel.aggregate(totalCountPipeline);

    res.json({
      products: productsWithAvgRating,
      totalCount: totalCount.length > 0 ? totalCount[0].totalCount : 0,
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ message: "Error fetching product data" });
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
