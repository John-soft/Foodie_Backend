const { Schema, model, Types } = require("mongoose");

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: false,
      default: "none",
    },
    password: {
      type: String,
      required: true,
    },
    verification: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "07038642679",
    },
    phoneVerification: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Types.ObjectId,
      ref: "Address",
      required: false,
    },
    userType: {
      type: String,
      required: true,
      default: "Client",
      enum: ["Client", "Admin", "Driver", "Vendor"],
    },
    profile: {
      type: String,
      default:
        "https://d326fntlu7tb1e.cloudfront.net/uploads/bdec9d7d-0544-4fc4-823d-3b898f6dbbbf-vinci_03.jpeg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
