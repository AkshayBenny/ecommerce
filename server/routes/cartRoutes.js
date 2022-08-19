import express from 'express'
import {
  addToCart,
  changeQty,
  deleteCartItem,
  getCartItems,
} from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
//test
//express-async-handler eliminates the repeated use of trycatch blocks

// @desc Get items from cart
// @route GET /api/cart/
// @access Private
router.route('/').get(protect, getCartItems)

// @desc Add to cart
// @route POST /api/cart/add
// @access Private
router.route('/add').post(protect, addToCart)

// @desc Change product quantity in cart
// @route PUT /api/cart/qty
// @access Private
router.route('/qty').post(protect, changeQty)

// @desc Remove from cart
// @route DELETE /api/cart/remove/:id
// @access Private
router.route('/:id').delete(protect, deleteCartItem)

export default router
