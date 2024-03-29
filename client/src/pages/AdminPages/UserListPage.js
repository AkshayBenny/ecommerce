import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { getAllUsers } from '../../redux/user/userSlice'

const UserList = () => {
  const { user, userList, userListIsLoading } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch])

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      navigate('/login')
    }
  }, [userInfo])

  if (userListIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />

      <h1>UserList</h1>
      <div className='space-y-3'>
        {userList?.map((user, index) => {
          return (
            <div key={index} className='border p-4'>
              <h2>
                {user.fname} {user.lname}
              </h2>
              <p>{user.email}</p>
              <Link to={`${user._id}/`}>
                <button className='bg-gray-500 text-white'>Edit</button>
              </Link>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export default UserList
