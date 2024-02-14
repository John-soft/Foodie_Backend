const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
});
const viewCategories = asyncHandler(async (req, res) => {});
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find(
    { title: { $ne: "More" } },
    { __v: 0 }
  );
  res.json(categories);
});
const getRandomCategories = asyncHandler(async (req, res) => {
  let categories = await Category.aggregate([
    { $match: { value: { $ne: "more" } } },
    { $sample: { size: 4 } },
    { $project: { __v: 0 } },
  ]);

  const moreCategory = await Category.findOne({ value: "more" }, { __v: 0 });
  if (moreCategory) {
    categories.push(moreCategory);
  }
  res.json(categories);
});

module.exports = {
  createCategory,
  viewCategories,
  getAllCategories,
  getRandomCategories,
};
