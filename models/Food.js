const { Schema, model, Types } = require("mongoose");

var foodSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
  },
  foodTags: {
    type: Array,
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  restaurant: {
    type: Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  ratingCount: {
    type: String,
    default: "257",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  additives: {
    type: Array,
    default: [],
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = model("Food", foodSchema);
