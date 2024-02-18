const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  getRandomCategories,
} = require("../controllers/categoryController");

router.route("/").post(createCategory);
router.get("/", getAllCategories);
router.get("/random", getRandomCategories);

module.exports = router;
