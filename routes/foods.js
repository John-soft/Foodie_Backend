const express = require("express");
const router = express.Router();
const {
  addFood,
  getFoodById,
  getRandomFood,
  getFoodsByRestaurant,
  getFoodsByCategoryAndCode,
  searchFood,
  getRandomFoodsByCategoryAndCode,
  getAllFoodsByCode,
} = require("../controllers/foodController");

router.post("/", addFood);
router.get("/:id", getFoodById);
router.get("/random/:code", getRandomFood);
router.get("/code/:code", getAllFoodsByCode);
router.get("restaurant-foods/:id", getFoodsByRestaurant);
router.get("/:category/:code", getFoodsByCategoryAndCode);
router.get("/search/:search", searchFood);
router.get("/random/:category/:code", getRandomFoodsByCategoryAndCode);

module.exports = router;
