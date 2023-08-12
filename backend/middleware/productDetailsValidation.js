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
      return res.status(400).json({ error: `Missing ${field} field.` });
    }
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = validateProduct;
