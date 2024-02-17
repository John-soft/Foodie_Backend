const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Address = require("../models/Address");

const createAddress = asyncHandler(async (req, res) => {
  const newAddress = await Address({
    userId: req.user.id,
    addressLine1: req.body.addressLine1,
    postalCode: req.body.postalCode,
    default: req.body.default,
    deliveryInstructions: req.body.deliveryInstructions,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  if (req.body.default === true) {
    await Address.updateMany({ userId: req.user.id }, { default: false });
  }
  /* 
  To save user to the database and make updates first create the model data 
  and use the save() method on it do not use the create() method
  on the model data directly
  */
  await newAddress.save();
  res
    .status(201)
    .json({ status: true, message: "Address added successfully", newAddress });
});

const getAddress = asyncHandler(async (req, res) => {
  const address = await Address.find({ userId: req.user.id });
  res.status(200).json(address);
});

const deleteAddress = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Address.findByIdAndDelete(id);
  res.status(200).json("Address deleted");
});

const setDefaultAddress = asyncHandler(async (req, res) => {
  const addressId = req.params.id;
  const userId = req.user.id;

  await Address.updateMany({ userId: userId }, { default: false });

  const updatedAddress = await Address.findByIdAndUpdate(addressId, {
    default: true,
  });

  if (updatedAddress) {
    await User.findByIdAndUpdate(userId, { address: addressId });
    res
      .status(200)
      .json({ status: true, message: "Address successfully set as default" });
  }
});

const getDefaultAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOne({
    userId: req.user.id,
    default: true,
  });
  res.status(200).json(address);
});

module.exports = {
  createAddress,
  getAddress,
  deleteAddress,
  setDefaultAddress,
  getDefaultAddress,
};
