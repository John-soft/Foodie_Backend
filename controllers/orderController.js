const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const placeOrder = asyncHandler(async (req, res) => {
  const order = Order.create({
    ...req.body,
    userId: req.user.id,
  });

  const orderId = order._id;
  res.status(200).json({
    status: true,
    message: "Order placed successfully",
    orderId: orderId,
  });
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { paymentStatus, orderStatus } = req.query;
  let query = { userId };
  if (paymentStatus) {
    query.paymentStatus = paymentStatus;
  }
  if (orderStatus === orderStatus) {
    query.orderStatus = orderStatus;
  }
  const orders = await Order.find(query).populate({
    path: "orderItems.foodId",
    select: "imageUrl title rating time",
  });
  res.status(200).json(orders);
});

module.exports = {
  placeOrder,
  getUserOrders,
};
