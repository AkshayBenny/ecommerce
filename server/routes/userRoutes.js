import express from 'express'
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserByAdmin,
} from '../controllers/userController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
//test
//express-async-handler eliminates the repeated use of trycatch blocks

// @desc Get all users
// @route POST /api/users/
// @access Private/Admin
router.get('/', protect, isAdmin, getAllUsers)

// @desc Delete user
// @route POST /api/users/:id
// @access Private/Admin
router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserByAdmin)

// @desc Authenticate user
// @route GET /api/users/login
// @access Public
router.post('/login', authUser)

// @desc Get User Profile
// @route GET /api/users/profile
// @access Private
router.route('/profile').get(protect, getUserProfile)

// @desc Get User Profile and update it
// @route GET /api/users/profile/update
// @access Private
router.route('/profile/update').put(protect, updateUser)

// @desc Register new user
// @route POST /api/users/register
// @access Public
router.route('/register').post(registerUser)

export default router
