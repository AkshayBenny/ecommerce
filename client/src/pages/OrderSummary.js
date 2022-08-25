import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/cart/cartSlice'
import { createOrder } from '../redux/order/orderSlice'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const OrderSummary = () => {
  const dispatch = useDispatch()
  const { paymentMode, error, isLoading, createOrderIsLoading, order } =
    useSelector((state) => state.order)
  const { cartItems, total } = useSelector((state) => state.cart)
  const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'))
  const user = JSON.parse(localStorage.getItem('userInfo'))

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  //orderItems
  const orderItems = []
  cartItems?.forEach((product) => {
    orderItems.push({
      name: product.product.name,
      qty: product.userCartItems.quantity,
      image: product.product.image,
      price: product.userCartItems.price,
      product: product.product._id,
    })
  })

  //shippingAddress
  const shippingAddress = {
    address: shippingDetails.address,
    city: shippingDetails.city,
    postalCode: shippingDetails.postalCode,
    country: shippingDetails.country,
  }
  //paymentMethod
  const paymentMethod = paymentMode

  const clickHandler = () => {
    let totalPrice = 0
    orderItems.map((product) => {
      return (totalPrice += product.price)
    })

    dispatch(
      createOrder({ orderItems, shippingAddress, paymentMethod, totalPrice })
    )
  }

  useEffect(() => {
    if (!createOrderIsLoading && order.createdOrder) {
      navigate(`/payment/${order.createdOrder._id}`)
    }
  }, [order])

  if (!user) {
    navigate('/login')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Header />
      <h1 className='text-3xl font-light  mt-14 px-12'>Order summary</h1>
      <div className='space-y-4'>
        <div>
          <p className='text-xl font-light  mt-14 px-12'>Shipping Address</p>
          <p className='font-medium text-lg px-12'>
            {shippingDetails?.address}
          </p>
        </div>
        <div>
          <p className='text-xl font-light  mt-2 px-12'>City</p>
          <p className='font-medium text-lg px-12'>{shippingDetails?.city}</p>
        </div>
        <div>
          <p className='text-xl font-light  mt-2 px-12'>Postal Code</p>
          <p className='font-medium text-lg px-12'>
            {shippingDetails?.postalCode}
          </p>
        </div>
        <div>
          <p className='text-xl font-light  mt-2 px-12'>Country</p>
          <p className='font-medium text-lg px-12'>
            {shippingDetails?.country}
          </p>
        </div>
        <div>
          <p className='text-xl font-light  mt-2 px-12'>Total Price</p>
          <p className='font-medium text-lg px-12'>{total} ₹</p>
        </div>
        <div>
          <p className='text-xl font-light  mt-2 px-12'>Payment Mode</p>
          <p className='font-medium text-lg px-12'>{paymentMode}</p>
        </div>
      </div>

      <div className='px-12'>
        <button
          onClick={clickHandler}
          disabled={createOrderIsLoading}
          className='mt-12 relative inline-block px-6 py-4 font-medium group mx-auto'
        >
          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
          <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
          <span className='relative text-black group-hover:text-white'>
            Place order
          </span>
        </button>
      </div>
      {createOrderIsLoading && <p>Loading...</p>}
      <Footer />
    </>
  )
}

export default OrderSummary
