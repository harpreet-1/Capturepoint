const ProductFilterQuery = (req, res, next) => {
  try {
    const filters = JSON.parse(req.headers["pr-filters"]);

    const query = {};

    const orConditions = [];

    for (const key in filters) {
      const filter = filters[key];

      // Check if the filter has values
      if (filter && filter.length > 0) {
        const filterQuery = {};

        if (key === "search") {
          const searchRegex = { $regex: filter, $options: "i" };
          orConditions.push({ name: searchRegex });
          orConditions.push({ description: searchRegex });
        } else if (key === "category" || key === "brand") {
          filterQuery[key] = { $in: filter };
        } else if (key === "minprice") {
          filterQuery.price = { $gte: filter };
        } else if (key === "maxprice") {
          filterQuery.price = { $lte: filter };
        } else if (key === "stockQuantity") {
          filterQuery.stockQuantity = { $gte: filter };
        }

        if (Object.keys(filterQuery).length > 0) {
          query.$and
            ? query.$and.push(filterQuery)
            : (query.$and = [filterQuery]);
        }
      }
    }

    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    req.query = query; // Attach the query to the request object

    next();
  } catch (error) {
    console.log("query**********************", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = ProductFilterQuery;
