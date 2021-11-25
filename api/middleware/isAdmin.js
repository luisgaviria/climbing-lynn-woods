const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.isAdmin = (req, res, next) => {
  const authtoken = req.get("Authorization");
  if (!authtoken) {
    const error = new Error();
    error.message = "Not authenticated!";
    error.statusCode = 401;
    throw error;
  }
  const token = authtoken.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
  } catch (err) {
    err.statusCode = 500;
    throw error;
  }
  if (!decodeToken) {
    const error = new Error();
    error.message = "Not authenticated!";
    error.statusCode = 401;
    throw error;
  }
  req.AdminId = decodeToken.adminId;
  next();
};
