const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/otp_generator");
const sendEmail = require("../utils/email");

const createUser = asyncHandler(async (req, res) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(req.body.email)) {
    return res
      .status(400)
      .json({ status: false, message: "Email is not valid" });
  }

  const minPasswordLength = 8;
  console.log(req.body.password);

  if (req.body.password.length < minPasswordLength) {
    console.log(8);
    return res.status(400).json({
      status: false,
      message:
        "Password should be at least " + minPasswordLength + " characters",
    });
  }
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res
      .status(400)
      .json({ status: false, message: "Email already exists" });
  }

  const otp = generateOtp;

  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    userType: "Client",
    password: req.body.password,
    otp: otp,
  });

  sendEmail(newUser.email, otp);

  res
    .status(201)
    .json({ status: true, message: "User Successfully Created", newUser });
});

const login = asyncHandler(async (req, res) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(req.body.email)) {
    return res
      .status(400)
      .json({ status: false, message: "Email is not valid" });
  }

  const minPasswordLength = 8;

  if (req.body.password.length < minPasswordLength) {
    return res.status(400).json({
      status: false,
      message:
        "Password should be at least " + minPasswordLength + "characters",
    });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ status: false, message: "User not found" });
  }

  if (!user && !(await user.isPasswordCorrect)) {
    return res
      .status(400)
      .json({ status: false, message: "Password incorrect" });
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      userType: user.userType,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "21d" }
  );
  const { password, createdAt, updatedAt, __v, otp, ...others } = user._doc;
  res.status(200).json({ ...others, accessToken });
});

module.exports = {
  createUser,
  login,
};
