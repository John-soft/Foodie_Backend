const express = require("express");
const router = express.Router();
const {
  addRestaurant,
  getRestaurantById,
  getAllNearbyRestaurants,
  getRandomRestaurants,
} = require("../controllers/restaurantController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, addRestaurant);
router.get("/:id", getRestaurantById);
router.get("/all/:code", getAllNearbyRestaurants);
router.get("/random/:code", getRandomRestaurants);

module.exports = router;
