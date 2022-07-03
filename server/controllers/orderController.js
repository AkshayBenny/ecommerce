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

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const uid = req.user.id

  const userOrder = await Order.findById(orderId).populate('user', 'name email')
  if (uid === userOrder.user._id) {
    if (userOrder) {
      res.json({ userOrder })
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const allOrders = await Order.find({})
    res.json({ allOrders })
  } catch (error) {
    res.status(404).json({ message: error.message, error })
  }
})
