import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

export const addToCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body

  const user = req.user._id

  const cartExists = await Cart.findOne({ user: user })
  if (cartExists) {
    const productExist = cartExists.cartItems.find(
      (cartItem) => cartItem.product == cartItems.product
    )

    if (productExist) {
      const userCart = await Cart.findOneAndUpdate(
        {
          user: user,
          'cartItems.product': cartItems.product,
        },
        { $set: { cartItems: { ...cartItems, quantity: cartItems.quantity } } }
      )
    } else {
      const userCart = await Cart.findOneAndUpdate(
        { user: user },
        { $push: { cartItems: cartItems } }
      )
    }

    res.status(201).json({ userCart })
  } else {
    const userCart = await Cart.create({ user, cartItems: [cartItems] })
    res.status(201).json({ userCart })
  }
  // res.status(201).json(userCart)
})
