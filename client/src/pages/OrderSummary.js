import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/cart/cartSlice'
import { createOrder } from '../redux/order/orderSlice'
import { useNavigate } from 'react-router-dom'

const OrderSummary = () => {
  const dispatch = useDispatch()
  const { paymentMode, error, isLoading, createOrderIsLoading, order } =
    useSelector((state) => state.order)
  const { cartItems, total } = useSelector((state) => state.cart)
  const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'))
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
    const orderResult = JSON.parse(localStorage.getItem('orderResult'))
    if (!createOrderIsLoading && orderResult) {
      navigate(`/payment/${orderResult.createdOrder._id}`)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Shipping Address: {shippingDetails?.address}</p>
      <p>City: {shippingDetails?.city}</p>
      <p>Postal Code: {shippingDetails?.postalCode}</p>
      <p>Country: {shippingDetails?.country}</p>
      <p>Total Price:{total}</p>
      <p>Payment Mode: {paymentMode}</p>

      <button
        className='bg-black text-white px-4 py-2 cursor-pointer'
        onClick={clickHandler}
      >
        Place order
      </button>
      {createOrderIsLoading && <p>Loading...</p>}
    </div>
  )
}

export default OrderSummary
