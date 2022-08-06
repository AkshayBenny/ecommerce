import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  adminUpdateOrderToDelivered,
  getOrderById,
} from '../../redux/order/orderSlice'

const OrderDetailsPage = () => {
  const { id } = useParams()
  const {
    oidLoading,
    orderById,
    adminUpdateOrderToDeliveredResIsLoading,
    adminUpdateOrderToDeliveredRes,
  } = useSelector((state) => state.order)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderById({ id }))
  }, [])

  const clickHandler = () => {
    dispatch(adminUpdateOrderToDelivered({ id }))
  }

  if (oidLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className='text-3xl'>Order Details Page</h1>
      <div className='space-y-6'>
        <p className='text-xl'>
          Order ID:
          <span className='font-bold'>{orderById?.userOrder?._id}</span>
        </p>
        <div className='flex justify-between'>
          <div className='space-y-3'>
            <p className='text-xl font-light'>
              Amount:
              <span className='font-bold'>
                {orderById?.userOrder?.totalPrice}
              </span>
            </p>
            <p className='text-xl font-light'>
              Paid:
              <span className='font-bold'>
                {orderById?.userOrder?.isPaid
                  ? orderById.userOrder.paidAt.substring(0, 10)
                  : 'false'}
              </span>
              \
            </p>
          </div>
          <div>
            <p className='text-xl font-light'>
              Delivered:
              <span className='font-bold'>
                {orderById?.userOrder?.isDelivered ? 'true' : 'false'}
              </span>
            </p>
            <button className='bg-black text-white p-1' onClick={clickHandler}>
              Update to delivered
            </button>
            {adminUpdateOrderToDeliveredResIsLoading && <div>Loading...</div>}
          </div>
        </div>
        <p className='mt-12 '>Name: {orderById?.userOrder?.user?.name}</p>
        <p>Email: {orderById?.userOrder?.user?.email}</p>
        <p>User ID:{orderById?.userOrder?.user?._id}</p>
        <div className='flex flex-wrap gap-3'>
          {orderById?.userOrder?.orderItems?.map((item, index) => {
            return (
              <div key={index} className='border w-36'>
                <img
                  className='h-36 w-36 object-cover mb-3'
                  src={item.image}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
