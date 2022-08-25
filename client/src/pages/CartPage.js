import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import { getCart } from '../redux/cart/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CartPage = () => {
  const { cartItems, total, isLoading, deleteCartRes } = useSelector(
    (state) => state.cart
  )
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getCart())
  }, [dispatch])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in cart</div>
  }

  if (cartItems && cartItems.length > 0) {
    return (
      <>
        <Header />
        <div className='grid lg:grid-cols-2 px-4 pt-6'>
          <Meta title={'Cart'} />
          <div className='space-y-4 w-full'>
            <h1 className='text-3xl font-light pb-6'>Cart</h1>
            {cartItems?.map((product, index) => {
              return (
                <CartProduct
                  key={index}
                  product={product.product}
                  userCartItem={product.userCartItems}
                  index={index}
                />
              )
            })}
          </div>
          <div className='mt-12  flex flex-col lg:justify-between lg:mt-0 lg:border-2 border-black max-h-[600px] lg:p-6 space-y-4 max-w-[500px] w-full ml-auto'>
            <div className='space-y-4'>
              <div className='font-medium text-black opacity-40 flex justify-between items-center'>
                <p className=''>Subtotal</p>
                <p>{total}₹</p>
              </div>
              <div className='flex justify-between items-center text-black font-light opacity-30'>
                <p>Delivery</p>
                <p>0</p>
              </div>
              <div className='flex justify-between border-b border-black border-opacity-10 pb-12 items-center text-black font-light opacity-30'>
                <p>Tax</p>
                <p>0</p>
              </div>
              <div className='flex justify-between items-center pt-6 text-black font-semibold '>
                <h3>Total</h3>
                <p>{total}₹</p>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <Link to='/shipping'>
                <button className='mt-12 relative w-full px-5 py-3 font-medium group'>
                  <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                  <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                  <span className='relative text-black group-hover:text-white'>
                    Proceed to checkout
                  </span>
                </button>
              </Link>
              <Link to='/'>
                <button className=' relative w-full px-5 py-3 font-medium group'>
                  <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                  <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                  <span className='relative text-black group-hover:text-white'>
                    Continue shopping
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default CartPage
