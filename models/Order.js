const { Schema, model, Types } = require("mongoose");

let orderItemSchema = new Schema({
  foodId: {
    type: Types.ObjectId,
    ref: "Food",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  additives: {
    type: Array,
  },
  instructions: {
    type: String,
    default: "",
  },
});

let orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    orderItems: [orderItemSchema],
    orderTotal: {
      type: Number,
      required: true,
    },
    deliveryTotal: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: Types.ObjectId,
      ref: "Address",
      required: true,
    },
    restuarantAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Completed", "Failed"],
    },
    orderStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Placed",
        "Preparing",
        "Manual",
        "Delivered",
        "On the way",
        "Cancelled",
        "Delivered",
      ],
    },
    restuarantId: {
      type: Types.ObjectId,
      ref: "Restuarant",
    },
    restuarantCoords: [Number],
    recipientCoords: [Number],
    rating: {
      type: Number,
      default: 3,
      max: 5,
      min: 1,
    },
    feedback: String,
    promoCode: String,
    discountAmount: Number,
    notes: String,
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
