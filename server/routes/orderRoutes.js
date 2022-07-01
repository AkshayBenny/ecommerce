import express from 'express'
import { createOrder } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc Create new order
// @route POST /api/order
// @access Private
router.route('/').post(protect, createOrder)

export default router
