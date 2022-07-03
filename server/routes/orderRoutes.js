import express from 'express'
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc Create new order
// @route POST /api/order
// @access Private
router.route('/').post(protect, createOrder)

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
router.route('/:id').get(protect, getOrderById)

// @desc Get all order
// @route GET /api/order/
// @access Private
router.route('/').get(protect, getAllOrders)

export default router
