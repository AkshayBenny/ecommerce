import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminCreateProduct } from '../../redux/product/productsSlice'

const CreateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminCreatedProduct } = useSelector((state) => state.products)
  const [productData, setProductData] = useState({
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    countInStock: 0,
  })
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      navigate('/login')
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(adminCreateProduct({ productData }))
  }

  useEffect(() => {
    if (adminCreatedProduct.createdProduct) {
      navigate('/admin/products')
    }
  }, [adminCreatedProduct])

  return (
    <div>
      <h1 className='my-4 text-2xl text-bold'>Edit Product Page</h1>
      <form onSubmit={submitHandler} className=' flex flex-col gap-5'>
        <div>
          <label>Name</label>
          <input
            type='text'
            placeholder='Name'
            value={productData.name}
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
            value={productData.image}
            className='p-4 w-full border-black rounded border-2'
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Brand</label>
          <input
            type='text'
            placeholder='Brand'
            value={productData.brand}
            className='p-4 w-full border-black rounded border-2'
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, brand: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type='text'
            placeholder='Category'
            value={productData.category}
            className='p-4 w-full border-black rounded border-2'
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, category: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type='text'
            placeholder='Description'
            value={productData.description}
            className='p-4 w-full border-black rounded border-2'
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type='text'
            placeholder='Price'
            value={productData.price}
            className='p-4 w-full border-black rounded border-2'
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Count in stock</label>
          <input
            type='text'
            placeholder='Count in stock'
            value={productData.countInStock}
            className='p-4 w-full border-black rounded border-2'
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                countInStock: e.target.value,
              }))
            }
          />
        </div>
        <button className='bg-black p-3 text-white'>Create product</button>
      </form>
    </div>
  )
}

export default CreateProduct
