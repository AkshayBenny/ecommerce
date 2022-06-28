import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export const addToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    try {
      user.cart.push(req.body.cart || user.cart)
    } catch (error) {
      res.json({ message: 'Error adding to cart' })
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      cart: updatedUser.cart,
    })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})
