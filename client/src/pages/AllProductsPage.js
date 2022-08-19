import { Link, useParams } from 'react-router-dom'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { useEffect } from 'react'
import {
  getAllProducts,
  getLatestProducts,
  getTopProducts,
} from '../redux/product/productsSlice'
import Meta from '../components/Meta'
import { getCart } from '../redux/cart/cartSlice'

const AllProductsPage = () => {
  const {
    page: currentPage,
    pages,
    products,
    isLoading,

    error,
  } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const { id: keyword } = useParams()

  const pagesArray = []
  for (var i = 1; i <= pages; i++) {
    pagesArray.push(i)
  }
  useEffect(() => {
    dispatch(getAllProducts({ keyword }))
    dispatch(getTopProducts())
    dispatch(getLatestProducts())
    dispatch(getCart())
  }, [dispatch, keyword])

  const pageHandler = (page) => {
    dispatch(getAllProducts({ keyword, page }))
  }

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
    <>
      <Meta />

      <div className='grid md:grid-cols-2 xl:grid-cols-3 '>
        {products.length === 0 && <div>No products found</div>}
        {products?.map((product, index) => {
          return (
            <Link to={`/product/${product._id}`} key={index}>
              <Product product={product} />
            </Link>
          )
        })}
      </div>
      <div className='w-full flex justify-center'>
        <div className='flex gap-2 my-9 w-fit'>
          {pagesArray.length > 1 &&
            pagesArray.map((page, index) => {
              return (
                <button
                  key={index}
                  onClick={() => pageHandler(page)}
                  className={` border  py-2 px-3  ${
                    currentPage === page ? 'bg-black text-white' : ''
                  }`}
                >
                  {page}
                </button>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default AllProductsPage
