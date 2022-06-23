import express from 'express'
import { authUser } from '../controllers/useController.js'

const router = express.Router()

//express-async-handler eliminates the repeated use of trycatch blocks

// @desc Fetch all pro ducts
// @route GET /api/products
// @access Public
router.post('/login', authUser)

export default router
