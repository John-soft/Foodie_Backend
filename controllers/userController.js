const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, __v, createdAt, ...userData } = user._doc;

    res.status(200).json(...userData);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const verifyAccount = asyncHandler(async (req, res) => {
  const userOtp = req.params.otp;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "false", message: "User not found" });
    }

    if (userOtp === user.otp) {
      user.verification = true;
      user.otp = "";
      await user.save();
      //   res
      //     .status(200)
      //     .json({
      //       message: "OTP verified successfully",
      //       user: { ...user, otp: "" },
      //     });

      const { password, __v, otp, createdAt, updatedAt, ...others } = user._doc;
      console.log(otp);
      return res.status(200).json({
        message: "OTP Verified successfully",
        ...others,
      });
    } else {
      return res
        .status(400)
        .json({ status: "false", message: "Otp Verification Failed" });
    }
  } catch (error) {
    res.status(500).json({ status: "false", message: error.message });
  }
});

const verifyPhone = asyncHandler(async (req, res) => {
  const phone = req.params.phone;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "false", message: "User not found" });
    }

    user.phoneVerification = true;
    user.phone = phone;
    await user.save();

    const { password, __v, otp, createdAt, ...others } = user._doc;
    return res.status(200).json(...others);
  } catch (error) {
    res.status(500).json({ status: "false", message: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({ status: true, message: "User deleted" });
});

module.exports = {
  getUser,
  verifyAccount,
  verifyPhone,
  deleteUser,
};
