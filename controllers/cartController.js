const { count } = require("console");
const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

const addProductToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, additives, totalPrice, quantity } = req.body;

  let count;

  const existingProduct = await Cart.findOne({
    userId: userId,
    productId: productId,
  });
  count = await Cart.countDocuments({ userId: userId });
  if (existingProduct) {
    existingProduct.totalPrice += totalPrice * quantity;
    existingProduct.quantity += quantity;
    await existingProduct.save();
    res.status(200).json({ status: true, count: count });
  } else {
    const newCartItem = await Cart.create({
      userId: userId,
      productId: productId,
      additives: additives,
      totalPrice: totalPrice,
      quantity: quantity,
    });
    count = await Cart.countDocuments({ userId: userId });
    return res.status(201).json({ status: true, count: count, newCartItem });
  }
});

const removeCartItem = asyncHandler(async (req, res) => {
  const cartItemId = req.params.id;
  const userId = req.user.id;

  await Cart.findByIdAndDelete({ _id: cartItemId });
  const count = await Cart.countDocuments({ userId: userId });
  res.status(200).json({ status: true, count: count });
});

const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.find({ userId: userId }).populate({
    path: "productId",
    select: "imageUrl title restaurant rating ratingCount",
    populate: {
      path: "restaurant",
      select: "time coords",
    },
  });
  res.status(200).json(cart);
});

const getCartCount = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const count = await Cart.countDocuments({ userid: userId });
  res.status(200).json({ status: true, count: count });
});

const decrementProductQty = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const cartItem = await Cart.findById(id);

  if (cartItem) {
    const productPrice = cartItem.totalPrice / cartItem.quantity;

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      cartItem.totalPrice -= productPrice;
      await cartItem.save();
      res.status(200).json({
        status: true,
        message: "Product quantity successfully decremented",
      });
    } else {
      await Cart.findByIdAndDelete({ _id: id });
      res.status(200).json({
        status: true,
        message: "Product successfully removed from cart",
      });
    }
  } else {
    res.status(400).json({ status: false, message: "Product not found" });
  }
});

module.exports = {
  addProductToCart,
  removeCartItem,
  getCart,
  getCartCount,
  decrementProductQty,
};
