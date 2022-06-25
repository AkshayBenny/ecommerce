import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
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

// @desc Register new user
// @route POST /api/users/register
// @access Public
router.route('/register').post(registerUser)

export default router
