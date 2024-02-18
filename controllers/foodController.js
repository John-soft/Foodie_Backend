const asyncHandler = require("express-async-handler");
const Food = require("../models/Food");

const addFood = asyncHandler(async (req, res) => {
  const {
    title,
    time,
    foodTags,
    category,
    foodType,
    code,
    isAvailable,
    restaurant,
    description,
    price,
    additives,
    imageUrl,
  } = req.body;

  if (
    !title ||
    !time ||
    !foodTags ||
    !category ||
    !foodType ||
    !code ||
    !isAvailable ||
    !restaurant ||
    !description ||
    !price ||
    !additives ||
    !imageUrl
  ) {
    throw new Error("Some fields are missing");
  }
  const newFood = await Food.create(req.body);
  res.status(200).json({
    status: true,
    message: "New Food Added",
    newFood,
  });
});

const getFoodById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);

  if (!food) {
    throw new Error(`Food id ${id} not found`);
  }
  res.status(200).json(food);
});

const getRandomFood = asyncHandler(async (req, res) => {
  let foods = [];
  if (req.params.code) {
    foods = await Food.aggregate([
      { $match: { code: req.params.code, isAvailable: true } },
      { $sample: { size: 3 } },
      { $project: { __v: 0 } },
    ]);
  }

  if (!foods.length) {
    foods = await Food.aggregate([
      { $sample: { size: 3 } },
      { $project: { __v: 0 } },
    ]);
  }
  if (foods.length) {
    res.status(200).json(foods);
  }

  res.status(200).json({
    length: foods.length,
    foods,
  });
});

const getAllFoodsByCode = asyncHandler(async (req, res) => {
  try {
    const code = req.params.code;
    const foods = await Food.find({ code: code });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

const getFoodsByRestaurant = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById({ restaurant: id });
  res.status(200).json(food);
});

const getFoodsByCategoryAndCode = asyncHandler(async (req, res) => {
  const { category, code } = req.body;
  const foods = await Food.aggregate([
    { $match: { category: category, code: code, isAvailable: true } },
    { $project: { __v: 0 } },
  ]);
  if (foods.length === 0) {
    res.status(200).json([]);
  }

  res.status(200).json(foods);
});

const searchFood = asyncHandler(async (req, res) => {
  const search = req.params.search;
  const result = await Food.aggregate([
    {
      $search: {
        index: "foods",
        text: { query: search, path: { wildcard: "*" } },
      },
    },
  ]);
  res.status(200).json(result);
});

const getRandomFoodsByCategoryAndCode = asyncHandler(async (req, res) => {
  const { category, code } = req.body;

  let foods = [];

  foods = await Food.aggregate([
    { $match: { category: category, code: code, isAvailable: true } },
    { $sample: { size: 10 } },
  ]);

  if (!foods || foods.length === 0) {
    foods = await Food.aggregate([
      { $match: { code: code, isAvailable: true } },
      { $sample: { size: 10 } },
    ]);
  } else if (!foods || foods.length === 0) {
    foods = await Food.aggregate([
      { $match: { isAvailable: true } },
      { $sample: { size: 10 } },
    ]);
  }

  res.status(200).json(foods);
});

module.exports = {
  addFood,
  getFoodById,
  getRandomFood,
  getAllFoodsByCode,
  getFoodsByRestaurant,
  getFoodsByCategoryAndCode,
  searchFood,
  getRandomFoodsByCategoryAndCode,
};
