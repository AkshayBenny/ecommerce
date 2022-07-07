import express from 'express'
import { deleteProduct, getAllProductsAdmin, getProductByIdAdmin, updateProductByAdmin } from '../controllers/productController.js'

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
router.get('/products', protect, isAdmin, getAllProductsAdmin)

// @desc Other product routes like delete, put and get by id
// @route POST /api/admin/products/:id
// @access Private/Admin
router
  .route('/products/:id')
  .delete(protect, isAdmin, deleteProduct)
  .get(protect, isAdmin, getProductByIdAdmin)
  .put(protect, isAdmin, updateProductByAdmin)

export default router
