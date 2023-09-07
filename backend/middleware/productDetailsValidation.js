// Custom middleware for product validation
const validateProduct = (req, res, next) => {
  const requiredFields = [
    "name",
    "description",
    "price",
    "images",
    "category",
    "stockQuantity",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `Missing ${field} value.` });
    }
  }
  next(); // Proceeding to the next route handler
};

module.exports = validateProduct;
