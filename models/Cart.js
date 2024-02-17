const { Schema, model, Types } = require("mongoose");

let cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: Types.ObjectId,
      required: true,
      ref: "Food",
    },
    additives: {
      type: Array,
      required: false,
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", cartSchema);
