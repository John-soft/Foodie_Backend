const express = require("express");
const router = express.Router();
const {
  createCategory,
  viewCategories,
  getAllCategories,
  getRandomCategories,
} = require("../controllers/categoryController");

router.route("/").post(createCategory);
router.get("/", getAllCategories);
router.get("/random", getRandomCategories);

module.exports = router;
