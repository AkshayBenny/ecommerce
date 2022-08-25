import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import {
  adminDeleteProductById,
  getAllProductsAdmin,
  setAdminCreatedProduct,
  setAdminUpdatedProduct,
} from '../../redux/product/productsSlice'

const ProductListPage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    allProductsAdmin,
    allProductsAdminIsLoading,
    adminDeleteProductByIdIsLoading,
  } = useSelector((state) => state.products)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllProductsAdmin())
      dispatch(setAdminUpdatedProduct({}))
      dispatch(setAdminCreatedProduct({}))
    } else {
      navigate('/login')
    }
  }, [dispatch, adminDeleteProductByIdIsLoading])

  const deleteHandler = (e) => {
    dispatch(adminDeleteProductById(e.target.id))
  }

  if (allProductsAdminIsLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Header />

      <p>ProductList</p>
      <Link to='create-product/'>
        <button className='p-2 bg-black mx-auto text-white mt-4'>
          Create Product
        </button>
      </Link>
      <div className='space-y-3'>
        {allProductsAdmin?.map((product, index) => {
          return (
            <div key={index} className='border p-4 flex space-x-6 items-center'>
              <img
                src={product.image}
                alt={product.name}
                className='h-24 w-24 object-cover'
              />
              <div>
                <h2>{product.name}</h2>
                <div className='gap-2 flex'>
                  <Link to={`edit/${product._id}`}>
                    <button className='bg-black p-2 text-white'>Edit</button>
                  </Link>
                  <button
                    id={product._id}
                    onClick={deleteHandler}
                    className='bg-red-500 p-2 text-white'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export default ProductListPage
