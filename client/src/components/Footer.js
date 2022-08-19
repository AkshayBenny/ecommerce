import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='mt-[200px] '>
      <div className='grid lg:grid-cols-2 px-4 border-t gap-12 py-24  max-w-[1200px] mx-auto'>
        <div className='space-y-6 mx-auto'>
          <Link to='/'>
            <div className='text-3xl uppercase hover:cursor-pointer'>
              gauss.
            </div>
          </Link>
          <p className='text-2xl font-light '>
            Sign up for the latest news, facts, analysis, and original stories
            about our products.
          </p>
        </div>
        <div className='mx-auto flex flex-col items-start w-full space-y-3'>
          <input
            type='email'
            className='border p-4 max-w-2xl w-full focus:ring-myPink focus:outline-myPink'
            placeholder='Enter your email '
          />
          <Link
            to='/products'
            className='mt-12 relative inline-block px-4 py-3 font-medium group'
          >
            <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
            <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
            <span className='relative text-black group-hover:text-white'>
              Get updates
            </span>
          </Link>
        </div>
      </div>
      <div className='bg-black text-white w-full text-center py-4 flex flex-col lg:flex-row justify-between items-center px-4 font-light text-sm'>
        <p>Copyright &#169; GAUSS {currentYear}</p>
        <p>Developed by Akshay Benny</p>
      </div>
    </footer>
  )
}

export default Footer
