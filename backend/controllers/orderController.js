const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemPrice,
    taxPrice,
    paymentMethod,
    totalPrice,
    shippingPrice,
  } = req.body;

  if (orderItems && !orderItems.length) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      itemPrice,
      taxPrice,
      paymentMethod,
      totalPrice,
      shippingPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
exports.addOrderItems = addOrderItems;
exports.getOrderById = getOrderById;
