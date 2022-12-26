
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToWishlist, getWishlist } from '../redux/product/productsSlice'

const WishlistProduct = ({ product, index, setReload }) => {
  const { addToWishlistRes } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  const removeHandler = () => {
    const pid = product._id
    dispatch(addToWishlist({ pid }))
    dispatch(getWishlist())
    setReload((prev) => !prev)
  }

  return (
    <div className=' border flex lg:flex-row flex-col  w-full my-6 lg:my-0'>
      <div className='lg:flex  jusity-between gap-4  '>
        <div className={`${index % 2 === 0 ? 'bg-myPurple' : 'bg-myPink'} p-4`}>
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover ${
              index % 2 === 0 ? 'bg-myPurple' : 'bg-myPink'
            } w-[220px] h-[220px] `}
          />
        </div>
      </div>
      <div className='flex flex-col p-4 w-full'>
        <div className='flex justify-between items-center'>
          <p className='font-light text-3xl'>{product.name}</p>
          <p className='font-light text-4xl'>{product.price}₹</p>
        </div>
        <div className='lg:ml-auto mt-auto flex items-center gap-12'>
          <button
            onClick={removeHandler}
            className='mt-12 relative w-full px-5 py-3 font-medium group'
          >
            <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
            <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
            <span className='relative text-black group-hover:text-white'>
              Remove
            </span>
          </button>
          <button className='mt-12 relative w-full px-5 py-3 font-medium group'>
            <Link to={`/product/${product._id}`}>
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
              <span className='relative text-black group-hover:text-white'>
                View
              </span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistProduct
