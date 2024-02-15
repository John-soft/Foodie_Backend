const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/Restaurant");

const addRestaurant = asyncHandler(async (req, res) => {
  const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;

  if (
    !title ||
    !time ||
    !imageUrl ||
    !owner ||
    !code ||
    !logoUrl ||
    !coords ||
    !coords.latitude ||
    !coords.longitude ||
    !coords.address ||
    !coords.title
  ) {
    throw new Error("Some fields are missing");
  }

  const newRestaurant = await Restaurant.create(req.body);
  res.status(200).json({
    status: true,
    message: "Restaurant created successfully",
    newRestaurant,
  });
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    throw new Error(`User with the id ${id} not found`);
  }
  res.status(200).json(restaurant);
});

const getAllNearbyRestaurants = asyncHandler(async (req, res) => {
  const code = req.params.code;
  let allNearByRestaurants = [];
  if (code) {
    allNearByRestaurants = await Restaurant.aggregate([
      { $match: { code: code, isAvailable: true } },
      { $project: { __v: 0 } },
    ]);
  }
  if (allNearByRestaurants.length == 0) {
    allNearByRestaurants = await Restaurant.aggregate([
      { $match: { code: code, isAvailable: true } },
      { $project: { __v: 0 } },
    ]);
  }

  res.status(200).json(allNearByRestaurants);
});

const getRandomRestaurants = asyncHandler(async (req, res) => {
  const code = req.params.code;
  let randomRestaurants = [];

  if (code) {
    randomRestaurants = await Restaurant.aggregate([
      { $match: { code: code, isAvailable: true } },
      { $sample: { size: 5 } },
      { $project: { __v: 0 } },
    ]);
  }
  if (randomRestaurants.length == 0) {
    randomRestaurants = await Restaurant.aggregate([
      { $match: { code: code, isAvailable: true } },
      { $sample: { size: 5 } },
      { $project: { __v: 0 } },
    ]);
  }

  res.status(200).json({
    length: randomRestaurants.length,
    randomRestaurants,
  });
});

module.exports = {
  addRestaurant,
  getRestaurantById,
  getAllNearbyRestaurants,
  getRandomRestaurants,
};
