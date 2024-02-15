const { Schema, model } = require("mongoose");

let ratingSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ratingType: {
      type: String,
      required: true,
      enum: ["Restaurant", "Food", "Driver"],
    },
    product: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Rating", ratingSchema);
