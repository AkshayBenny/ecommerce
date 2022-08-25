import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Wishlist from '../models/wishlistModel.js'

// @desc Fetch all pro ducts
// @route GET /api/products
// @access Public
export const getAllProducts = asyncHandler(async (req, res) => {
  //current page
  const page = Number(req.query.page) || 1
  //size of each page
  const pageSize = 6

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
  // res.status(401)
  // throw new Error('Product not found')
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc GET top products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json({ products })
})
// @desc GET latest products
// @route GET /api/products/latest
// @access Public
export const getLatestProducts = asyncHandler(async (req, res) => {
  const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(6)
  res.json({ latestProducts })
})

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    // res.status(404).json({ message: 'Product not found' }) not required anymore because error handler middleware was created
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Fetch all products
// @route GET /api/admin/products
// @access Private/Admin
export const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch all products
// @route GET /api/admin/products
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product deleted successfully' })
  } else {
    res.json({ message: 'Product not found' })
  }
})

// @desc Fetch product by id
// @route GET /api/admin/products/:id
// @access Private/Admin
export const getProductByIdAdmin = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.json({ message: 'Product not found' })
  }
})

// @desc Create new product
// @route POST /api/admin/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body.productData
  const product = new Product({
    user: req.user._id,
    name: name,
    image: image,
    brand: brand,
    category: category,
    description: description,
    price: price,
    countInStock: countInStock,
  })

  try {
    const createdProduct = await product.save()
    res
      .status(201)
      .json({ message: 'Product created successfully', createdProduct })
  } catch (error) {
    res.status(400).json({ message: 'Product creation failed' })
  }
})

// @desc Update product by id
// @route PUT /api/admin/products/:id
// @access Private/Admin
export const updateProductByAdmin = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body.productData

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.image = image
    product.brand = brand
    product.category = category
    product.description = description
    product.price = price
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json({ message: 'Product updated successfully', updatedProduct })
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

// @desc Add a review to a product
// @route POST /api/products/:id/review
// @access Private
export const addReview = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const userId = req.user._id
  const { rating, comment } = req.body
  const product = await Product.findById(productId)
  if (product) {
    // check if user review on this product already exists
    if (product.reviews.length >= 1) {
      const userReview = product.reviews.filter(
        (review) => review.user === userId
      )
      if (userReview)
        return res.status(400).json({ message: 'Review already exists' })
    }
    product.numReviews = product.reviews.length
    product.reviews.push({
      fname: req.user.fname,
      lname: req.user.lname,
      rating: Number(rating),
      user: userId,
      comment: comment,
    })
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    const updatedProduct = await product.save()
    res
      .status(201)
      .json({ message: 'Review added successfully', updatedProduct })
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

export const addToWishlist = asyncHandler(async (req, res) => {
  const user = req.user._id

  const whishlistExists = await Wishlist.findOne({ user: user })
  if (whishlistExists) {
    const productExist = whishlistExists.wishlist.find(
      (item) => item.product == req.params.id
    )

    if (productExist) {
      await Wishlist.updateOne(
        { 'wishlist.product': req.params.id },
        {
          $pull: {
            wishlist: { product: req.params.id },
          },
        }
      )
      res.status(201).json({
        message: 'Product succesfully removed from wishlist',
        inWishlist: false,
      })
    } else {
      await Wishlist.findOneAndUpdate(
        { user: req.user._id },
        { $push: { wishlist: { product: req.params.id } } }
      )
      res
        .status(201)
        .json({ message: 'Successfully added to wishlist', inWishlist: true })
    }
  } else {
    await Wishlist.create({
      user,
      wishlist: [{ product: req.params.id }],
    })
    res
      .status(201)
      .json({ message: 'Successfully added to wishlist', inWishlist: true })
  }
})

// @desc Get wishlist
// @route GET /api/products/wishlist
// @access Private
export const getWishlist = asyncHandler(async (req, res) => {
  const user = req.user._id

  try {
    const userWishlist = await Wishlist.find({ user: user }).populate({
      path: 'wishlist',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })

    res.status(200).json({ userWishlist })
  } catch (error) {
    res.json({ message: 'Could not find wishlist', error })
  }
})
