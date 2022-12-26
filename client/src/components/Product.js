
const Product = ({ product }) => {
  return (
    <div className='bg-black group transition cursor-pointer border-[0.5px] border-white relative'>
      <img
        className='bg-black object-contain group-hover:scale-95 transition duration-500  h-96 w-full p-2 rounded-xl'
        src={product.image}
        alt={product.name}
      />
      <div className='absolute  w-full z-40 bottom-2 left-0  lg:opacity-0 group-hover:opacity-100 duration-400 space-y-2  transition'>
        <div className=' truncate w-1/6 text-black bg-white py-2 px-4 max-w-full'>
          <p className='font-light truncate'>{product.brand}</p>
        </div>
        <div className='truncate w-2/5 text-black bg-white p-4'>
          <p className='truncate font-semibold text-xl'>{product.name}</p>
        </div>
      </div>
      {/* <div className='p-2 space-y-2'>
        <h2 className='truncate text-xl text-gray-700 font-normal uppercase'>
          {product.name}
        </h2>
        <Rating
          rating={product.rating}
          text={`${product.numReviews} reviews`}
        />
        <p className='text-2xl text-gray-600 font-light'>{product.price}$</p>
      </div> */}
    </div>
  )
}

export default Product
