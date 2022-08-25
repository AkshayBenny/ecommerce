import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/user/userSlice'

const SignInPage = () => {
  const { isLoading, error } = useSelector((state) => state.user)
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Something went wrong...</div>

  return (
    <form
      onSubmit={submitHandler}
      className='flex  flex-col items-center justify-center h-screen'
    >
      <div className=' flex flex-col items-center justify-center space-y-6 border-2 border-black p-12'>
        <h1 className='font-medium text-3xl'>Sign in</h1>
        <div className='w-full pt-12'>
          <p className='font-light pb-2'>Enter your email</p>
          <input
            type='email'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-full border-2 border-black rounded-none px-4 py-4 min-w-[350px]'
          />
        </div>
        <div className='w-full pb-6'>
          <p className='font-light pb-2'>Enter your password</p>
          <input
            type='text'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='w-full border-2 border-black rounded-none px-4 py-4'
          />
        </div>

        <button
          type='submit'
          className=' relative inline-block px-12 py-4 font-medium group mx-auto'
        >
          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
          <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
          <span className='relative text-black group-hover:text-white'>
            Sign in
          </span>
        </button>
        <div className='flex pb-12'>
          <p>New user? </p>
          <Link to='/register'>
            <p className='cursor-pointer hover:underline pl-2'>Register</p>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignInPage
