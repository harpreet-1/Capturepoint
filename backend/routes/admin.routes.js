const express = require("express");
const OrderModel = require("../Models/OrderModel");
const UserModel = require("../Models/userModel");
const ProductModel = require("../Models/ProductsModel");
const adminRouter = express.Router();

adminRouter.get("/highlights", async (req, res) => {
  try {
    // Use Promise.all to execute both queries concurrently

    const [orderStats, userCount] = await Promise.all([
      OrderModel.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$orderTotal" },
            totalCount: { $sum: 1 }, // Counting the number of orders
          },
        },
      ]),
      UserModel.countDocuments(),
    ]);

    // Check if there are results
    if (orderStats.length > 0) {
      // Return the order statistics and user count
      res.json({ ...orderStats[0], userCount, status: true });
    } else {
      // Default values when there are no orders
      res.json({ totalAmount: 0, totalCount: 0, userCount, status: true });
    }
  } catch (error) {
    console.error("error from /admin/hignlihts", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
});

adminRouter.get("/orders", async (req, res) => {
  try {
    const limit = req.query.limit || Infinity;
    console.log(limit);

    const orders = await OrderModel.find({ "products.cancelled": false })
      .populate({
        path: "products.product",
        model: ProductModel,
        select: "name price images description category brand stockQuantity",
      })
      .populate({
        path: "user",
        model: UserModel,
        select: "username address",
      })
      .sort("-createdAt")
      .limit(limit)
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
module.exports = adminRouter;
