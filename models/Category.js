const { Schema, model } = require("mongoose");

let categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
