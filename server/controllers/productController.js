import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all pro ducts
// @route GET /api/products
// @access Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // res.status(401)
  // throw new Error('Product not found')
  res.json(products)
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
  const products = await Product.find({})
  // res.status(401)
  // throw new Error('Product not found')
  res.json(products)
})

// @desc Fetch all products
// @route GET /api/admin/products
// @access Private/Admin
export const getProductByIdAdmin = asyncHandler(async (req, res) => {
  let product
 try {
  const product = await Product.findById(req.params.id)
  if(product){
   res.json(product)
  }
 } catch (error) {
  res.json({message:"Product not found"})
 }

  // res.status(401)
  // throw new Error('Product not found')
  res.json(product)
})

// @desc Fetch all products
// @route GET /api/admin/products
// @access Private/Admin
export const updateProductByAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // res.status(401)
  // throw new Error('Product not found')
  res.json(products)
})
