import React from 'react';

const Product = (product) => {
  console.log(product);
  return <div>Product page</div>;
};

export default Product;

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const response = await fetch(
    `https://fakestoreapi.com/products?id=${productId}`
  );
  const productData = await response.json();

  return {
    props: {
      product: productData,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  const paramsArray = [];
  data.map((item) => {
    paramsArray.push({ params: { productId: item.id.toString() } });
  });
  return {
    paths: paramsArray,
    fallback: false,
  };
}
