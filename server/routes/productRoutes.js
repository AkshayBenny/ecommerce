import express from 'express'
import {
  getAllProducts,
  getProductById,
} from '../controllers/productController.js'
const router = express.Router()

//express-async-handler eliminates the repeated use of trycatch blocks

// @desc Fetch all pro ducts
// @route GET /api/products
// @access Public
router.route('/').get(getAllProducts)

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById)

export default router
