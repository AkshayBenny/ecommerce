import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getOrderByUserId } from '../redux/order/orderSlice'

const UserOrders = () => {
  const { getOrderByUserIdResIsLoading, getOrderByUserIdRes } = useSelector(
    (state) => state.order
  )
  const dispatch = useDispatch()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const orders = getOrderByUserIdRes.userOrders

  useEffect(() => {
    if (userInfo._id) {
      dispatch(getOrderByUserId({ id: userInfo._id }))
    }
  }, [])

  if (getOrderByUserIdResIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />

      <h1>UserOrders</h1>
      <div className='space-y-4'>
        {orders?.map((order, index) => {
          return (
            <div key={index} className='border w-full '>
              <div className='flex items-center gap-2 flex-wrap'>
                {order.orderItems.map((product, index) => {
                  return (
                    <div className='w-fit'>
                      <img
                        className='h-24 w-24 object-cover'
                        src={product.image}
                        alt={product.name}
                      />
                      <p className='truncate'>{product.name}</p>
                      <p>Qty: {product.qty}</p>
                    </div>
                  )
                })}
              </div>
              <p className='text-xl font-light'>
                Total price: {order.totalPrice}
              </p>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export default UserOrders
