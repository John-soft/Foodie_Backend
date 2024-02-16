const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");
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
      type: Boolean,
      default: false,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("User", userSchema);
