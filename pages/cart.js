import React from 'react';

const cart = ({ cart, products }) => {
  console.log(cart.products);
  console.log(products);

  return (
    <div>
      {/* {cart.products.map((product, index) => {
        return <div key={index}></div>;
      })} */}
    </div>
  );
};

export default cart;

export async function getServerSideProps() {
  const userId = 2;
  const response = await fetch('https://fakestoreapi.com/carts');
  const data = await response.json();

  const userCart = data.find((item) => item.userId == userId);

  // const userProductsArray = [];

  // const myProductFetcher = async (pid) => {
  //   const productResponse = await fetch('https://fakestoreapi.com/products');
  //   const productData = await productResponse.json();
  //   const productId = pid;
  //   const myProduct = productData.find((item) => item.id == productId);
  //   userProductsArray.push(myProduct);
  // };

  // get the products correspnding to the user
  // const userProducts = await userCart.products.map((item) => {
  //   myProductFetcher(item.productId);
  // });

  return {
    props: {
      cart: userCart,
      // products: typeof userCart.products,
    },
  };
}
