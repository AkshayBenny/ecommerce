import { Link, useParams } from 'react-router-dom'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { useEffect } from 'react'
import { getAllProducts, getTopProducts } from '../redux/product/productsSlice'
import Meta from '../components/Meta'

const HomePage = () => {
  const {
    page: currentPage,
    pages,
    products,
    isLoading,
    topProductsRes,
    topProductsResIsLoading,
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
  }, [dispatch, keyword])

  const pageHandler = (page) => {
    dispatch(getAllProducts({ keyword, page }))
  }
  console.log(topProductsRes)

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
      <div className='flex gap-2'>
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
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {products.length === 0 && <div>No products found</div>}
        {products?.map((product, index) => {
          return (
            <Link to={`/product/${product._id}`} key={index}>
              <Product product={product} />
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default HomePage
