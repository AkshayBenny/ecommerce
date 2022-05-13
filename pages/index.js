/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Decrement from '../components/reducerTest/Decrement';
import Increment from '../components/reducerTest/Increment';
export default function Home(data) {
  const count = useSelector((state) => state.counter.value);
  return (
    <div className='px-6'>
      <div className='py-12 w-full border rounded'>
        <p className='text-red-500 uppercase'>this is a test area</p>
        <div className='flex gap-4 justify-center'>
          <Increment />
          <Decrement />
          <p>{count}</p>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {data.data.map((item, index) => {
          console.log(typeof item.image);
          return (
            <Link key={index} href={`/${item.id}`}>
              <div className='hover:border boder-white p-12 shadow-sm hover:border-gray-200 rounded hover:shadow-md transition'>
                <img
                  className='object-cover'
                  src={item.image}
                  alt={item.title}
                />
                <h1>{item.title}</h1>
                <p>${item.price}</p>
                <div>
                  <p>
                    {item.rating.rate}({item.rating.count})
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  return {
    props: {
      data: data,
    },
  };
}
