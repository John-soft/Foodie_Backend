const Rating = require("../models/Rating");
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");
const asyncHandler = require("express-async-handler");

const addRating = asyncHandler(async (req, res) => {
  const newRating = await Rating.create({
    userId: req.user.id,
    ratingType: req.body.ratingType,
    product: req.body.product,
    rating: req.body.rating,
  });

  if (req.body.ratingType === "Restaurant") {
    const restaurant = await Rating.aggregate([
      {
        $match: {
          ratingType: req.body.ratingType,
          product: req.body.product,
        },
      },
      { $group: { _id: "$product" }, avgRating: { $avg: "$rating" } },
    ]);
    if (restaurant.length > 0) {
      const averageRating = restaurant[0].avgRating;
      await Restaurant.findByIdAndUpdate(
        req.body.product,
        { rating: averageRating },
        { new: true }
      );
    }
  } else if (req.body.ratingType === "Food") {
    const foods = await Rating.aggregate([
      {
        $match: {
          ratingType: req.body.ratingType,
          product: req.body.product,
        },
      },
      { $group: { _id: "$product" }, avgRating: { $avg: "$rating" } },
    ]);
    if (foods.length > 0) {
      const averageRating = foods[0].avgRating;
      await Food.findByIdAndUpdate(
        req.body.product,
        { rating: averageRating },
        { new: true }
      );
    }
  }
  res.status(200).json({
    status: true,
    message: "Rating updated successfully",
    newRating,
  });
});

const checkUserRating = asyncHandler(async (req, res) => {
  const ratingType = req.query.ratingType;
  const product = req.query.product;

  const existingRating = await Rating.findOne({
    userId: req.user.id,
    product: product,
    ratingType: ratingType,
  });

  if (existingRating) {
    res
      .status(200)
      .json({ status: true, message: " You have already rated this product" });
  } else {
    res.status(500).json({
      status: false,
      message: " You have not rated this product",
    });
  }
});

module.exports = {
  addRating,
  checkUserRating,
};
