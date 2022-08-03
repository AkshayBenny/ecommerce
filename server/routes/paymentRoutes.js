import Razorpay from 'razorpay'
import express from 'express'
import crypto from 'crypto'

const router = express.Router()

router.post('/', (req, res) => {})

router.get('/get-razorpay-key', (req, res) => {
  res.send({ key: process.env.RAZORPAY.KEY.ID })
})

export default router
