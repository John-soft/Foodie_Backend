const express = require("express");
const router = express.Router();
const {
  addRating,
  checkUserRating,
} = require("../controllers/ratingController");

router.post("/", addRating);
router.get("/", checkUserRating);
module.exports = router;
