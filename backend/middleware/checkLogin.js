const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModel");

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

      if (req.path === "/admin-register") {
        const user = await UserModel.findById(decoded.user.id);

        if (!user || !user.isAdmin) {
          console.log("Someone trying to access admin routes", user);
          return res.status(404).json({ message: "Access denied" });
        }
      }
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
