import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/user/userSlice'

const RegisterPage = () => {
	const { isLoading, error } = useSelector((state) => state.user)

	const user = JSON.parse(localStorage.getItem('userInfo'))
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(registerUser({ fname, lname, email, password }))
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
			className='flex  flex-col items-center justify-center h-screen'>
			<div className=' flex flex-col items-center justify-center space-y-6 border-2 border-black p-12'>
				<h1 className='font-medium text-3xl'>Register</h1>
				<div className='w-full '>
					<p className='font-light pb-2'>First name</p>
					<input
						type='text'
						placeholder='First name'
						onChange={(e) => setFname(e.target.value)}
						value={fname}
						className='w-full border-2 border-black rounded-none px-4 py-4 min-w-[350px]'
					/>
				</div>
				<div className='w-full '>
					<p className='font-light pb-2'>Last name</p>
					<input
						type='text'
						placeholder='Last name'
						onChange={(e) => setLname(e.target.value)}
						value={lname}
						className='w-full border-2 border-black rounded-none px-4 py-4 min-w-[350px]'
					/>
				</div>
				<div className='w-full '>
					<p className='font-light pb-2'>Email address</p>
					<input
						type='email'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className='w-full border-2 border-black rounded-none px-4 py-4 min-w-[350px]'
					/>
				</div>
				<div className='w-full '>
					<p className='font-light pb-2'>Password</p>
					<input
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className='w-full border-2 border-black rounded-none px-4 py-4 min-w-[350px]'
					/>
				</div>
				<button
					type='submit'
					className=' relative inline-block px-12 py-4 font-medium group mx-auto'>
					<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
					<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
					<span className='relative text-black group-hover:text-white'>
						Register
					</span>
				</button>
				<div className='flex pb-12'>
					<p>Already have an account? </p>
					<Link to='/login'>
						<p className='cursor-pointer hover:underline pl-2'>
							Sign in
						</p>
					</Link>
				</div>
			</div>
		</form>
	)
}

export default RegisterPage
