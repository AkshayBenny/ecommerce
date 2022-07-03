import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../redux/order/orderSlice'
const OrderPage = () => {
  const { id } = useParams()
  const { orderById, oidLoading } = useSelector((state) => state.order)
  const { total } = useSelector((state) => state.cart)
  const { paymentMode } = useSelector((state) => state.order)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderById({ id }))
  }, [dispatch, id])
  console.log(orderById?.userOrder?.isDelivered)

  if (oidLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Shipping Address: {orderById?.userOrder?.shippingAddress?.address}</p>
      <p>City: {orderById?.userOrder?.shippingAddress?.city}</p>
      <p>Postal Code: {orderById?.userOrder?.shippingAddress?.postalCode}</p>
      <p>Country: {orderById?.userOrder?.shippingAddress?.country}</p>
      <p>Total Price:{total}</p>
      <p>Payment Mode: {paymentMode}</p>
      <p>Paid :{orderById?.userOrder?.isPaid ? 'Paid' : 'Not paid'}</p>
      <p>
        Delivered:
        {orderById?.userOrder?.isDelivered ? 'Deivered' : 'Not delivered'}
      </p>
    </div>
  )
}

export default OrderPage
