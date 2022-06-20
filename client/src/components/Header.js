import { ShoppingCartIcon, LoginIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className='sticky top-0 flex justify-between items-center h-24 bg-gray-800 text-white px-4 md:px-24 uppercase'>
      <Link to='/'>
        <div className='text-3xl hover:cursor-pointer'>A-Shop</div>
      </Link>
      <div className='flex items-center gap-12'>
        <Link to='/cart'>
          <div className='btn-hover flex justify-center items-center gap-2'>
            <ShoppingCartIcon className='h-5' />
            <p>Cart</p>
          </div>
        </Link>
        <div className='btn-hover flex justify-center items-center gap-2'>
          <LoginIcon className='h-5' />
          <p>Sign In</p>
        </div>
      </div>
    </header>
  )
}

export default Header
