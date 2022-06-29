import express from 'express'
import { addToCart } from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
//test
//express-async-handler eliminates the repeated use of trycatch blocks

// @desc Add to cart
// @route POST /api/cart/add
// @access Private
router.route('/add').post(protect, addToCart)

// @desc Remove from cart
// @route POST /api/cart/remove
// @access Private
// router.route('/remove').put(protect,removeFromCart)

export default router
