import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  adminUpdateProduct,
  getProductByIdAdmin,
} from '../../redux/product/productsSlice'

const EditProductPage = () => {
  const { id } = useParams()

  const { adminProductById, adminProductByIdIsLoading } = useSelector(
    (state) => state.products
  )
  const [productData, setProductData] = useState({
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    countInStock: 0,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProductByIdAdmin({ id }))
    } else {
      navigate('/login')
    }
  }, [dispatch])

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      navigate('/login')
    }
  }, [userInfo])

  useEffect(() => {
    if (adminProductById) {
      setProductData({
        name: adminProductById?.name,
        image: adminProductById?.image,
        brand: adminProductById?.brand,
        category: adminProductById?.category,
        description: adminProductById?.description,
        price: adminProductById?.price,
        countInStock: adminProductById?.countInStock,
      })
    }
  }, [adminProductByIdIsLoading])

  const submitHandler = (e) => {
    let payload = { id, productData }
    e.preventDefault()
    dispatch(adminUpdateProduct(payload))
  }

  if (adminProductByIdIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className='my-4 text-2xl text-bold'>Edit Product Page</h1>
      <form onSubmit={submitHandler} className=' flex flex-col gap-5'>
        <div>
          <label>Name</label>
          <input
            type='text'
            placeholder='Name'
            value={productData?.name}
            className='p-4 w-full border-black rounded border-2'
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type='text'
            placeholder='Image'
            value={productData?.image}
            className='p-4 w-full border-black rounded border-2'
          />
        </div>
        <div>
          <label>Brand</label>
          <input
            type='text'
            placeholder='Brand'
            value={productData?.brand}
            className='p-4 w-full border-black rounded border-2'
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type='text'
            placeholder='Category'
            value={productData?.category}
            className='p-4 w-full border-black rounded border-2'
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type='text'
            placeholder='Description'
            value={productData?.description}
            className='p-4 w-full border-black rounded border-2'
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type='text'
            placeholder='Price'
            value={productData?.price}
            className='p-4 w-full border-black rounded border-2'
          />
        </div>
        <div>
          <label>Count in stock</label>
          <input
            type='text'
            placeholder='Count in stock'
            value={productData?.countInStock}
            className='p-4 w-full border-black rounded border-2'
          />
        </div>
        <button className='bg-black p-3 text-white'>Update product</button>
      </form>
    </div>
  )
}

export default EditProductPage
