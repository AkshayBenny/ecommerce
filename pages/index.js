/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
export default function Home(data) {
  return (
    <div className='px-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {data.data.map((item, index) => {
          console.log(typeof item.image);
          return (
            <Link key={index} href={`/${item.id}`}>
              <div className='hover:border p-12 hover:border-gray-200 rounded hover:shadow-md transition'>
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
