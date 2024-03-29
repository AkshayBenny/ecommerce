import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Razorpay from 'razorpay'
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

  let createdOrder, razorOrder

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No items in order')
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

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const options = {
      amount: totalPrice,
      currency: 'INR',
    }

    const razorOrder = await instance.orders.create(options)
    if (!razorOrder)
      return res
        .status(500)
        .json({ message: 'Something went wrong with razorpay' })
  } catch (error) {}

  res
    .status(201)
    .json({ message: 'Order created successfully', createdOrder, razorOrder })
})

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id

  const userOrder = await Order.findById(orderId).populate('user', 'name email')

  if (userOrder) {
    res.json({ userOrder })
  } else {
    res.status(404).json({ message: 'Order not found' })
  }
})

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
export const getOrderByUserId = asyncHandler(async (req, res) => {
  const uid = req.params.id

  const userOrders = await Order.find({ user: uid })

  if (userOrders) {
    res.json({ userOrders })
  } else {
    res.status(404).json({ message: 'User does not have any orders' })
  }
})

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const allOrders = await Order.find({}).populate('user', 'name id')
    res.json({ allOrders })
  } catch (error) {
    res.status(404).json({ message: 'Error getting all orders', error })
  }
})

// @desc Update Order to paid
// @route GET /api/order/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const userOrder = await Order.findById(orderId)
  if (userOrder) {
    try {
      const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body

      userOrder.isPaid = true
      userOrder.paidAt = Date.now()
      try {
        userOrder.razorpay = {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        }
      } catch (error) {
        console.log('Error at setting razorpay stuff', error)
      }

      try {
        userOrder.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        }
      } catch (error) {
        console.log('Error at setting paymentResult', error)
      }
      const updatedOrder = await userOrder.save()
      res.json({ message: 'Payment was successful', updatedOrder })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Payment failed' })
    }
  } else {
    res.json({ message: 'Order not found' })
  }
})

// @desc Update Order to delivered
// @route GET /api/orders/delivered/:id
// @access Private
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const userOrder = await Order.findById(req.params.id)
  if (userOrder) {
    try {
      userOrder.isDelivered = true
      const updatedOrder = await userOrder.save()
      res.json({ message: 'Delivery was successful', updatedOrder })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Delivery  failed' })
    }
  } else {
    res.json({ message: 'Order not found' })
  }
})
