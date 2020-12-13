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

exports.addOrderItems = addOrderItems;
