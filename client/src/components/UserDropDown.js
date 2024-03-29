import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { LoginIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { getCart } from '../redux/cart/cartSlice'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserDropDown() {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full   text-sm font-medium text-gray-700 focus:outline-none  '>
          <div className='rounded-full w-10 h-10 bg-gradient-to-r from-myPurple  to-myPink'></div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none '>
          <div className='py-1'>
            {user?.fname && (
              <Menu.Item className='px-4 pb-4'>
                {({ active }) => (
                  <p
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-[10px]'
                    )}
                  >
                    <div>
                      <p className='font-semibold normal-case pb-1'>
                        Signed in as
                      </p>
                      <p className=''>
                        {user?.fname} {user?.lname}
                      </p>
                    </div>
                  </p>
                )}
              </Menu.Item>
            )}
            {user?.fname && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/profile'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
            )}

            <Menu.Item>
              {({ active }) => (
                <p
                  className={classNames(
                    active
                      ? 'bg-gray-100 cursor-pointer text-gray-900'
                      : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {user?.fname ? (
                    <div
                      onClick={() => {
                        dispatch(logOut())
                        localStorage.removeItem('userInfo')
                        navigate('/')
                      }}
                    >
                      <p className=''>Sign out</p>
                    </div>
                  ) : (
                    <Link to='/login'>
                      <div className='flex items-center gap-2'>
                        <LoginIcon className='h-5' />
                        <p>Sign in</p>
                      </div>
                    </Link>
                  )}
                </p>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
