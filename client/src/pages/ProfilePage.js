import React from 'react'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  return (
    <div>
      <h1>ProfilePage</h1>

      <Link to='update'>
        <button className='bg-black p-2 text-white m-2 cursor-pointer'>
          Edit profile
        </button>
      </Link>

      <Link to='orders'>
        <button className='bg-black p-2 text-white m-2 cursor-pointer'>
          My orders
        </button>
      </Link>
    </div>
  )
}

export default ProfilePage
