import express from 'express'
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc GET razorpay key id
// @route GET /api/order/get-razorpay-key
// @access Private
router.get('/get-razorpay-key', protect, (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID })
})

// @desc Create new order
// @route POST /api/order
// @access Private
router.route('/').post(protect, createOrder)

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
router.route('/:id').get(protect, getOrderById)

// @desc Get order by id and update the payment status
// @route GET /api/order/:id/pay
// @access Private
router.route('/:id/pay').post(protect, updateOrderToPaid)

// @desc Get all order
// @route GET /api/order/
// @access Private
router.route('/').get(protect, getAllOrders)

export default router
