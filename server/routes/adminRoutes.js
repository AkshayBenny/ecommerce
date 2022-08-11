import express from 'express'
import {
  getAllOrders,
  getOrderById,
  updateOrderToDelivered,
} from '../controllers/orderController.js'
import {
  createProduct,
  deleteProduct,
  getAllProductsAdmin,
  getProductByIdAdmin,
  updateProductByAdmin,
} from '../controllers/productController.js'

import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserByAdmin,
} from '../controllers/userController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
//test
//express-async-handler eliminates the repeated use of trycatch blocks

//------------USER ROUTES------------------
// @desc Get all users
// @route POST /api/admin/users/
// @access Private/Admin
router.get('/users', protect, isAdmin, getAllUsers)

// @desc Delete user
// @route POST /api/admin/users/:id
// @access Private/Admin
router
  .route('/users/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserByAdmin)

//------------PRODUCT ROUTES------------------
// @desc Get all products
// @route POST /api/admin/products
// @access Private/Admin
router
  .route('/products')
  .get(protect, isAdmin, getAllProductsAdmin)
  .post(protect, isAdmin, createProduct)

// @desc Other product routes like delete, put and get by id
// @route POST /api/admin/products/:id
// @access Private/Admin
router
  .route('/products/:id')
  .delete(protect, isAdmin, deleteProduct)
  .get(protect, isAdmin, getProductByIdAdmin)
  .put(protect, isAdmin, updateProductByAdmin)

//------------ORDER ROUTES------------------
// @desc Mark order as delivered
// @route GET /api/order/delivered/:id
// @access Private/Admin
router
  .route('/orders/delivered/:id')
  .put(protect, isAdmin, updateOrderToDelivered)

// @desc Get all order
// @route GET /api/order/
// @access Private/Admin
router.route('/orders').get(protect, isAdmin, getAllOrders)

export default router
