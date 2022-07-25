import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProductsAdmin } from '../../redux/product/productsSlice'

const ProductListPage = () => {
  const { allProductsAdmin, allProductsAdminIsLoading } = useSelector(
    (state) => state.products
  )

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllProductsAdmin())
    } else {
      navigate('/login')
    }
  }, [dispatch])

  if (!allProductsAdminIsLoading) {
    console.log(allProductsAdmin)
  }

if(allProductsAdminIsLoading){
  return <div>
    <p>Loading...</p>
  </div>
}

  return <div><p>ProductList</p>
   <div className='space-y-3'>
        {allProductsAdmin?.map((product, index) => {
          return (
            <div key={index} className='border p-4'>
             <div> <h2>{product.name}</h2>
             
             <Link to={`${product._id}/`}>
               <button className='bg-gray-500 text-white'>Edit</button>
             </Link></div>
            </div>
          )
        })}
      </div>
  
  </div>
}

export default ProductListPage
