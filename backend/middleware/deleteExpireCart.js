const mongoose = require("mongoose");
const cron = require("node-cron");
const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductsModel");

// Export the cron job function
function runCartCleanupCron() {
  cron.schedule("0 */6 * * *", async () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    try {
      // Find cart items older than 2 days
      const expiredCartItems = await CartModel.find({
        createdAt: { $lt: twoDaysAgo },
      });
      console.log(
        "expiredCartItems**************************",
        expiredCartItems
      );
      // Release reserved stock and update product stock quantity
      for (const cartItem of expiredCartItems) {
        const product = await ProductModel.findById(cartItem.productId);

        if (product) {
          const releasedStock = cartItem.quantity;
          // Update product's available and reserved stock
          product.stockQuantity += releasedStock;
          await product.save();
        }
      }

      // Delete the expired cart items
      await CartModel.deleteMany({ createdAt: { $lt: twoDaysAgo } });

      console.log("Old cart items deleted and stock updated.");
    } catch (error) {
      console.error("Error deleting old cart items and updating stock:", error);
    }
  });
}
module.exports = runCartCleanupCron;
