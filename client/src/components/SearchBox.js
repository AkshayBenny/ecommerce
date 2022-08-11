import React from 'react'
import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className='bg-white rounded cursor-pointer flex items-center justify-center py-2 px-4 focus:shadow-lg text-black'
    >
      <input
        type='text'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search'
        className='focus:outline-none focus:ring-transparent focus:border-none'
      />
      <button>
        <SearchIcon className='text-gray-400 h-6 w-6' />
      </button>
    </form>
  )
}

export default SearchBox
