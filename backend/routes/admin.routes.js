const express = require("express");
const OrderModel = require("../Models/OrderModel");
const UserModel = require("../Models/userModel");
const ProductModel = require("../Models/ProductsModel");
const validateProduct = require("../middleware/productDetailsValidation");
const ProductFilterQuery = require("../middleware/ProductFilterQuery");
const { registerUser } = require("./user.routes");
const checkLogin = require("../middleware/checkLogin");
const adminRouter = express.Router();

adminRouter.post("/admin-register", checkLogin, registerUser);

adminRouter.get("/highlights", async (req, res) => {
  try {
    // Use Promise.all to execute both queries concurrently

    const [orderStats, userCount, productCount] = await Promise.all([
      OrderModel.aggregate([
        {
          $match: {
            orderStatus: { $ne: "Cancelled" }, // Exclude canceled orders
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$orderTotal" },
            totalCount: { $sum: 1 },
          },
        },
      ]),
      UserModel.countDocuments(),
      ProductModel.countDocuments(),
    ]);

    // Check if there are results
    if (orderStats.length > 0) {
      // Return the order statistics and user count
      res.json({ ...orderStats[0], userCount, productCount, status: true });
    } else {
      // Default values when there are no orders
      res.json({
        totalAmount: 0,
        totalCount: 0,
        userCount,
        productCount,
        status: true,
      });
    }
  } catch (error) {
    console.error("error from /admin/hignlihts", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
});

adminRouter.get("/orders", async (req, res) => {
  try {
    const limit = req.query.limit || 1000;
    console.log(limit);

    const orders = await OrderModel.find({
      products: {
        $elemMatch: {
          cancelled: false,
        },
      },
      "products.cancelled": false,
    })
      .populate({
        path: "products.product",
        model: ProductModel,
        select: "name price images",
      })
      .sort("-createdAt")
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No Orders Yet.", orders });
    }

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("error from /admin/recent-order", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

adminRouter.patch("/orders/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    console.log(status, id);
    const order = await OrderModel.findByIdAndUpdate(id, {
      orderStatus: status,
    });
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Order status updated " });
  } catch (error) {
    console.log("error from order status update", error);
    return res.status(404).json({ status: false, message: "Order not found" });
  }
});

adminRouter.get("/products", ProductFilterQuery, async (req, res) => {
  try {
    const products = await ProductModel.find(req.searchQuery).sort(
      "-createdAt"
    );
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("error from /admin/products", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
adminRouter.patch("/product/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndUpdate(id, {
      ...req.body,
      images: [req.body.image],
    });
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found." });
    }
    return res
      .status(200)
      .json({ status: true, message: "Product updated  successfully." });
  } catch (error) {
    console.log("error from admin/product/update", error);
    return res.status(404).json({ status: false, message: "Order not found" });
  }
});
adminRouter.delete("/product/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndRemove(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found." });
    }
    return res
      .status(200)
      .json({ status: true, message: "Product deleted successfully." });
  } catch (error) {
    console.log("error from admin/product/delete", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

//(^_^)=======================    Add new  Product       =========================

adminRouter.post("/product/add", validateProduct, async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res
      .status(200)
      .json({ status: true, message: "product added successfully" });
  } catch (error) {
    console.log("error from admin/product/add \n", error);
    res.status(500).json({
      status: false,
      message: "something went wrong , Please try again later",
    });
  }
});

module.exports = adminRouter;
