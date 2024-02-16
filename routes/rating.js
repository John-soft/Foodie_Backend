const express = require("express");
const router = express.Router();
const {
  addRating,
  checkUserRating,
} = require("../controllers/ratingController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, addRating);
router.get("/", verifyTokenAndAuthorization, checkUserRating);
module.exports = router;
