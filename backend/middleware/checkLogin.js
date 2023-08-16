const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  const authToken = req.headers["auth-token"];
  console.log(authToken);
  if (!authToken) {
    return res.status(401).json({ message: "Missing auth-token header." });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    if (decoded) {
      req.user = decoded.user;
      console.log("*******************", decoded);
      next();
    } else {
      return res.status(403).json({ message: "Invalid token." });
    }
  } catch (error) {
    console.log("error from login check***", error.message);
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = checkLogin;
