import Product from '../../components/product';

const ProductPage = (props) => {
  const { image, title, description, price, rating, category } = props.product;
  // console.log(image, title, description, price, rating, category);
  return (
    <div className='px-12'>
      <Product
        image={image}
        title={title}
        description={description}
        category={category}
        price={price}
        rating={rating}
      />

     
    </div>
  );
};

export default ProductPage;

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const response = await fetch(
    `https://fakestoreapi.com/products?id=${productId}`
  );
  const productData = await response.json();
  const selectedProduct = await productData.find(
    (item) => item.id == productId
  );

  return {
    props: {
      product: selectedProduct,
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
