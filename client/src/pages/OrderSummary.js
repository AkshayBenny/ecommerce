import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/cart/cartSlice'
import { createOrder } from '../redux/order/orderSlice'
import { useNavigate } from 'react-router-dom'

const OrderSummary = () => {
  const dispatch = useDispatch()
  const { paymentMode, error, isLoading } = useSelector((state) => state.order)
  const { cartItems, total } = useSelector((state) => state.cart)
  const { order } = useSelector((state) => state.order)
  const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'))
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  useEffect(() => {
    if (order.order) {
      navigate(`/order/${order.order.createdOrder._id}`)
    }
  }, [order, navigate])

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
    dispatch(createOrder({ orderItems, shippingAddress, paymentMethod }))
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
      <p>Shipping Address: {shippingDetails.address}</p>
      <p>City: {shippingDetails.city}</p>
      <p>Postal Code: {shippingDetails.postalCode}</p>
      <p>Country: {shippingDetails.country}</p>
      <p>Total Price:{total}</p>
      <p>Payment Mode: {paymentMode}</p>

      <button
        className='bg-black text-white px-4 py-2 cursor-pointer'
        onClick={clickHandler}
      >
        Place order
      </button>
    </div>
  )
}

export default OrderSummary
