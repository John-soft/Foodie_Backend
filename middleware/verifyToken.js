const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { verify } = require("crypto");

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: "false", message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: "false", message: "You are not authenticated" });
  }
});
const verifyTokenAndAuthorization = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Client" ||
      req.user.userType === "Admin" ||
      req.user.userType === "Vendor" ||
      req.user.userType === "Driver"
    ) {
      next();
    } else {
      return res.status(403).json({
        status: "false",
        message: "You are not allowed to perform this function",
      });
    }
  });
});
const verifyVendor = asyncHandler(async (req, res) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin" || req.user.userType === "Vendor") {
      next();
    } else {
      return res.status(403).json({
        status: "false",
        message: "You are not allowed to perform this function",
      });
    }
  });
});
const verifyAdmin = asyncHandler(async (req, res) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      next();
    } else {
      return res.status(403).json({
        status: "false",
        message: "You are not allowed to perform this function",
      });
    }
  });
});
const verifyDriver = asyncHandler(async (req, res) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Driver") {
      next();
    } else {
      return res.status(403).json({
        status: "false",
        message: "You are not allowed to perform this function",
      });
    }
  });
});

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyVendor,
  verifyAdmin,
  verifyDriver,
};
