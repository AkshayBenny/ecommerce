import express from 'express'
import {
  addReview,
  addToWishlist,
  getAllProducts,
  getLatestProducts,
  getProductById,
  getTopProducts,
  getWishlist,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

//express-async-handler eliminates the repeated use of trycatch blocks

// @desc Add  product to wishlist
// @route POST /api/products/wishlist/:id
// @access Private
router.post('/wishlist/:id', protect, addToWishlist)

// @desc Get wishlist
// @route GET /api/products/wishlist
// @access Private
router.get('/wishlist', protect, getWishlist)

// @desc Fetch all pro ducts
// @route GET /api/products
// @access Public
router.route('/').get(getAllProducts)

// @desc Get top products
// @route GET /api/products/top
// @access Public
router.route('/top').get(getTopProducts)

// @desc Get latest products
// @route GET /api/products/latest
// @access Public
router.route('/latest').get(getLatestProducts)

// @desc Fetch all products for admin
// @route GET /api/products
// @access Public
router.route('/').get()

// @desc Add a review to a product
// @route GET /api/products/:id/review
// @access Private
router.route('/:id/review').post(protect, addReview)

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById)

export default router
