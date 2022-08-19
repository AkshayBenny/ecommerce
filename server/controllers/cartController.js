import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'

export const addToCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body

  const user = req.user._id
  let userCart

  const cartExists = await Cart.findOne({ user: user })
  if (cartExists) {
    const productExist = cartExists.cartItems.find(
      (cartItem) => cartItem.product == cartItems.product
    )

    if (productExist) {
      const newQty =
        parseInt(productExist.quantity) + parseInt(cartItems.quantity)
      userCart = await Cart.findOneAndUpdate(
        { 'cartItems._id': productExist._id },
        {
          $set: {
            'cartItems.$.quantity': newQty,
          },
        }
      )
      res.status(201).json({ userCart })
      // userCart = await Cart.findOneAndUpdate(
      //   {
      //     user: user,
      //     'cartItems.product': cartItems.product,
      //   },
      //   { $set: { cartItems: { ...cartItems, quantity: newQuantity } } }
      // )
      // userCart = await Cart.findOneAndUpdate(
      //   {
      //     $and: [{ user: user }, { 'cartItems.$.product': cartItems.product }],
      //   },
      //   { $set: { cartItems: { ...cartItems, quantity: newQuantity } } }
      // )
    } else {
      userCart = await Cart.findOneAndUpdate(
        { user: user },
        { $push: { cartItems: cartItems } }
      )
      res.status(201).json({ userCart })
    }
  } else {
    const userCart = await Cart.create({ user, cartItems: [cartItems] })
    res.status(201).json({ userCart })
  }
  // res.status(201).json(userCart)
})

export const changeQty = asyncHandler(async (req, res) => {
  const { cartItems } = req.body

  const user = req.user._id
  let userCart

  const cartExists = await Cart.findOne({ user: user })
  if (cartExists) {
    const productExist = cartExists.cartItems.find(
      (cartItem) => cartItem.product == cartItems.product
    )

    if (productExist) {
      userCart = await Cart.findOneAndUpdate(
        { 'cartItems._id': productExist._id },
        {
          $set: {
            'cartItems.$.quantity': parseInt(cartItems.quantity),
          },
        }
      )
      res.status(201).json({ userCart })
    } else {
      userCart = await Cart.findOneAndUpdate(
        { user: user },
        { $push: { cartItems: cartItems } }
      )
      res.status(201).json({ userCart })
    }
  } else {
    const userCart = await Cart.create({ user, cartItems: [cartItems] })
    res.status(201).json({ userCart })
  }
})

export const getCartItems = asyncHandler(async (req, res) => {
  const user = req.user._id
  const userProducts = []
  let totalPrice = 0
  try {
    const userCart = await Cart.findOne({ user: user })
    for (var i = 0; i < userCart.cartItems.length; i++) {
      let userCartItems = userCart.cartItems[i]
      let productId = userCartItems.product
      let product = await Product.findOne({ _id: productId })
      userProducts.push({ product, userCartItems })
      totalPrice += product.price * userCartItems.quantity
    }
    res.status(200).json({ userProducts, totalPrice })
  } catch (error) {
    res.json({ message: 'Could not find cart' })
  }
})

export const deleteCartItem = asyncHandler(async (req, res) => {
  const pid = req.params.id

  const user = req.user._id
  let userCart

  const cartExists = await Cart.findOne({ user: user })
  if (cartExists) {
    const productExist = cartExists.cartItems.find(
      (cartItem) => cartItem.product == pid
    )

    if (productExist) {
      userCart = await Cart.findOneAndUpdate(
        { 'cartItems.product': pid },
        {
          $pull: { cartItems: { product: pid } },
        }
      )
      res.status(201).json({ userCart, message: 'Product removed from cart' })
    } else {
      res.status(404).json({ message: 'Product does not exist in your cart' })
    }
  } else {
    res.status(404).json({ message: 'Cart does not exist' })
  }
})
