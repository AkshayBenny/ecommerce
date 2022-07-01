import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/order
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  let createdOrder

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No items in order')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    createdOrder = await order.save()
  }

  res.status(201).json({ message: 'Order created successfully', createdOrder })
})
