import { ShoppingBagIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AdminDropDown from './AdminDropDown'
import UserDropDown from './UserDropDown'
import SearchBox from './SearchBox'
import { useEffect } from 'react'
import { getCart } from '../redux/cart/cartSlice'
const Header = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  return (
    <header className='sticky top-0 flex justify-between items-center h-14 z-50 bg-white text-black px-4 border-b  uppercase'>
      <Link to='/'>
        <div className='text-3xl hover:cursor-pointer'>gauss.</div>
      </Link>
      <SearchBox />
      <div className='flex items-center gap-12'>
        <div className='flex justify-center items-center gap-9'>
          <div className='mr-6  text-gray-400'>
            {user?.isAdmin && <AdminDropDown />}
          </div>
          <Link to='/cart'>
            <div className='relative  flex justify-center items-center gap-2'>
              <ShoppingBagIcon className='h-6' />
              {cartItems?.length === 0 ? (
                <></>
              ) : (
                <div
                  className={`absolute top-[-6px] right-[-6px] w-4 h-4 ${
                    cartItems?.length > 0 && 'bg-myPink'
                  } rounded-full  text-white p-2 flex items-center justify-center font-semibold text-xs`}
                >
                  <p>{cartItems && cartItems?.length}</p>
                </div>
              )}
            </div>
          </Link>
          <UserDropDown />
        </div>
      </div>
    </header>
  )
}

export default Header
