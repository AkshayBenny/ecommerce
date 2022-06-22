import { Link } from 'react-router-dom'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { useEffect } from 'react'
import { getAllProducts } from '../redux/product/productsSlice'

const HomePage = () => {
  const { products, isLoading, error } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  if (error) {
    return <div>Something went wrong...</div>
  }

  if (isLoading) {
    return (
      <div className='h-screen w-screen max-h-screen max-w-screen flex items-center'>
        <ReactLoading type={'bubbles'} color={'#6b7280'} className='mx-auto' />
      </div>
    )
  }

  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
      {products?.map((product, index) => {
        return (
          <Link to={`/product/${product._id}`} key={index}>
            <Product product={product} />
          </Link>
        )
      })}
    </div>
  )
}

export default HomePage
