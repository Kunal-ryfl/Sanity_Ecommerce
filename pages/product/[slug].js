import React, { useState } from 'react';
import { client,urlFor } from '../../components/lib/client';
import { Product } from '../../components';

const productdetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
  return (
    <>
<div className='product-details-container'> 
<div className='left'>

<div className='product-detail-image-container'>
  <img src={urlFor(image && image[index])} />
</div>
    
</div>
 
 <div className='right'>
  <pre className='configuration'>Device      Configuration...</pre>
  <h1 className='product-detail-device-name'> {name} </h1>
       <p className='product-detail-device-detail'>{details}</p>

       <h1 className='product-detail-device-price'>${price}</h1>

<hr className='dotted-line'></hr>


<button  className='button'>Add to cart </button>
<button className='button'>Buy Now</button>


 </div>
      
       </div>
    </>
  )
}
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    console.log(product);
  
    return {
      props: { products, product }
    }
  }
export default productdetails