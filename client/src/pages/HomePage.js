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
import TopProducts from '../components/TopProducts'
import { getCart } from '../redux/cart/cartSlice'
import LatestProducts from '../components/LatestProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomePage = () => {
  const {
    page: currentPage,
    pages,
    products,
    isLoading,
    topProductsRes,
    latestProductsRes,
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
      <Header />
      <Meta />
      <div>
        {topProductsRes.products ? (
          <TopProducts data={topProductsRes.products} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='min-h-[350px] bg-white py-24 text-black gap-9 flex flex-col lg:flex-row items-center justify-center'>
        <div className='hidden lg:grid mx-4'>
          <p className='font-black text-7xl tracking-wider'>We help</p>
          <p className='font-black text-7xl tracking-wider '>you find</p>
          <p className='font-black text-7xl tracking-wider text-myPink'>
            quality
          </p>
          <p className='font-black text-7xl tracking-wider text-myPurple'>
            products
          </p>
        </div>
        <div className='flex flex-col px-4 lg:hidden w-full'>
          <p className='font-black text-7xl tracking-wider'>We help you find</p>
          <div className='flex flex-wrap gap-2'>
            <p className='font-black text-7xl tracking-wider text-myPink'>
              quality
            </p>
            <p className='font-black text-7xl tracking-wider text-myPurple'>
              products
            </p>
          </div>
          <p className='grid lg:hidden pt-12 tracking-widest max-w-[700px] leading-6 text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            perspiciatis placeat ipsa maiores. Nostrum iste architecto expedita
            amet omnis dolor nihil et laudantium. Voluptas neque rerum veritatis
            vitae accusamus id.
          </p>
        </div>
        <p className='tracking-widest hidden lg:grid max-w-[700px] leading-6 text-xl'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
          dolore nemo deleniti nihil molestias ex explicabo cum quaerat? Vel
          sequi sunt impedit nulla omnis quisquam porro modi excepturi
          consequatur alias. Obcaecati vitae veritatis iusto facere accusamus
          perferendis.
        </p>
      </div>
      <div className='w-full bg-black px-4 pt-12  pb-2 uppercase'>
        <p className='text-white font-bold text-4xl text-center'>
          Our Latest Additions
        </p>
      </div>
      <LatestProducts products={latestProductsRes} />
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
        {/* <div className='flex gap-2 my-9 w-fit'>
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
        </div> */}
        <Link
          to='/products'
          className='mt-12 relative inline-block px-4 py-3 font-medium group'
        >
          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
          <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
          <span className='relative text-black group-hover:text-white'>
            See all products &#62;&#62;
          </span>
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
