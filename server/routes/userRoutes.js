import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
} from '../controllers/useController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//express-async-handler eliminates the repeated use of trycatch blocks

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
