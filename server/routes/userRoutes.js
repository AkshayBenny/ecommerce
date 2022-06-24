import express from 'express'
import { authUser, getUserProfile } from '../controllers/useController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//express-async-handler eliminates the repeated use of trycatch blocks

// @desc Fetch all pro ducts
// @route GET /api/products
// @access Public
router.post('/login', authUser)

// @desc Get User Profile
// @route GET /api/users/profile
// @access Private
router.route('/profile').get(protect, getUserProfile)

export default router
