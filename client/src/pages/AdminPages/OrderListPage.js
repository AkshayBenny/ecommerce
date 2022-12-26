import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { adminGetAllOrders } from '../../redux/order/orderSlice'

const OrderListPage = () => {
  const { adminGetAllOrdersRes, adminGetAllOrdersResIsLoading } = useSelector(
    (state) => state.order
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(adminGetAllOrders())
  }, [])

  if (adminGetAllOrdersResIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />

      <h1>OrderList</h1>
      {adminGetAllOrdersRes?.allOrders?.map((order, index) => {
        return (
          <div key={index} className='border m-2 p-4'>
            <p className='text-xl'>
              Order id: <span className='font-bold'>{order._id}</span>
            </p>
            <p>User id:{order.user._id}</p>
            <p>
              Name:{order.user.fname} {order.user.lname}
            </p>
            {/* <p>
              Address:{order.shippingAddress.address},
              {order.shippingAddress.city},{order.shippingAddress.country},
              {order.shippingAddress.postalCode}
            </p> */}
            <Link to={`${order._id}`}>
              <button className='bg-black text-white p-3 mt-2'>
                View more details
              </button>
            </Link>
          </div>
        )
      })}
      <Footer />
    </>
  )
}

export default OrderListPage
