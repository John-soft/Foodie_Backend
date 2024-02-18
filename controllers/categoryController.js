const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find(
    { title: { $ne: "More" } },
    { __v: 0 }
  );
  res.status(200).json(categories);
});

const getRandomCategories = asyncHandler(async (req, res) => {
  try {
    let categories = await Category.aggregate([
      { $match: { value: { $ne: "more" } } },
      { $sample: { size: 4 } },
      { $project: { __v: 0 } },
    ]);

    const moreCategory = await Category.findOne({ value: "more" });
    if (moreCategory) {
      categories.push(moreCategory);
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = {
  createCategory,
  getAllCategories,
  getRandomCategories,
};
