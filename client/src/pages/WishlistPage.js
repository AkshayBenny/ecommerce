
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Meta from '../components/Meta'
import WishlistProduct from '../components/WishlistProduct'
import { getWishlist } from '../redux/product/productsSlice'

const WishlistPage = () => {
  const dispatch = useDispatch()
  const { getWishlistResIsLoading, getWishlistRes } = useSelector(
    (state) => state.products
  )
  const [reload, setReload] = useState(false)
  useEffect(() => {
    dispatch(getWishlist())
  }, [reload])

  if (getWishlistResIsLoading) {
    return <div>Loading...</div>
  }

  if (!getWishlistRes || getWishlistRes?.length === 0) {
    return (
      <>
        <Header />
        <Meta title={'Wishlist'} />
        <div className='flex items-center justify-center w-screen h-screen'>
          <p className='text-3xl font-light'>
            You have not added any product to your wishlist yet
          </p>
        </div>
      </>
    )
  }
  
  return (
    <>
      <Header />
      <Meta title={'Wishlist'} />
      <h1 className='text-3xl font-light pb-6 pt-6 px-4'>Wishlist</h1>

      <div className='lg:grid grid-cols-2 gap-12 px-4'>
        {getWishlistRes?.map((product, index) => {
          return (
            <WishlistProduct
              key={index}
              product={product?.product}
              index={index}
              setReload={setReload}
            />
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export default WishlistPage
