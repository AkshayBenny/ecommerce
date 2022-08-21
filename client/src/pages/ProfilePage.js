import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../redux/user/userSlice'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.user)
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const [email, setEmail] = useState('')
  const [npassword, setNpassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (npassword !== cpassword) {
      alert('Password does not match')
      return
    } else {
      const password = npassword
      dispatch(updateUser({ email, fname, lname, phone, password }))
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <div className='w-full '>
      <div className='flex w-full items-center justify-center '>
        <Link to='update' className='w-full h-full group'>
          <div className='bg-myPurple  flex items-center justify-center uppercase  text-white  cursor-pointer w-full h-full lg:min-h-[400px]'>
            <p className='text-3xl font-medium group-hover:scale-90 transition'>
              Wishlist
            </p>
          </div>
        </Link>
        <Link to='orders' className='w-full h-full group'>
          <div className='bg-myPink  flex items-center justify-center uppercase  text-white  cursor-pointer w-full h-full lg:min-h-[400px]'>
            <p className='text-3xl font-medium group-hover:scale-90 transition'>
              Orders
            </p>
          </div>
        </Link>
      </div>
      <div className='px-4'>
        <form
          onSubmit={submitHandler}
          className='lg:space-y-12 max-w-[1200px] mx-auto'
        >
          <h1 className='text-3xl font-light  mt-14 px-12'>Edit Profile</h1>
          <div className='lg:flex px-12 gap-6 items-center justify-between '>
            <div className='w-full my-6 lg:my-0'>
              <p className='font-light pb-2'>First name</p>
              <input
                type='text'
                className='w-full border-2 border-black rounded-none px-4 py-4'
                placeholder='First Name'
                onChange={(e) => setFname(e.target.value)}
                value={user.fname ? user.fname : fname}
              />
            </div>
            <div className='w-full my-6 lg:my-0'>
              <p className='font-light pb-2'>Last name</p>
              <input
                type='text'
                className='w-full border-2  border-black rounded-none px-4 py-4'
                placeholder='Last Name'
                onChange={(e) => setLname(e.target.value)}
                value={user.lname ? user.lname : lname}
              />
            </div>
          </div>
          <div className='lg:flex px-12 gap-6 items-center justify-between '>
            <div className='w-full my-6 lg:my-0'>
              <p className='font-light pb-2'>Phone number</p>
              <input
                type='tel'
                className='w-full border-2 border-black rounded-none px-4 py-4'
                placeholder='Phone Number'
                onChange={(e) => setPhone(e.target.value)}
                value={user.phone ? user.phone : phone}
              />
            </div>
            <div className='w-full my-6 lg:my-0'>
              <p className='font-light pb-2'>Email address</p>
              <input
                type='text'
                className='w-full border-2  border-black rounded-none px-4 py-4'
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
                value={user.email ? user.email : email}
              />
            </div>
          </div>
          <div className='lg:flex px-12 gap-6 items-center justify-between '>
            <div className='w-full my-6 lg:my-0'>
              <p className='font-light pb-2'>New password</p>
              <input
                type='text'
                className='w-full border-2 border-black rounded-none px-4 py-4'
                placeholder='New Password'
                onChange={(e) => setNpassword(e.target.value)}
                value={npassword}
              />
            </div>
            <div className='w-full my-6 lg:my-0'>
              <p className='font-light pb-2'>Confirm password</p>
              <input
                type='text'
                className='w-full border-2  border-black rounded-none px-4 py-4'
                placeholder='Confirm Password'
                onChange={(e) => setCpassword(e.target.value)}
                value={cpassword}
              />
            </div>
          </div>
          <div className='px-12 w-full'>
            <button
              type='submit'
              className='mt-12 relative inline-block px-6 py-4 font-medium group mx-auto'
            >
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
              <span className='relative text-black group-hover:text-white'>
                Save changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
