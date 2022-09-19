import React from 'react'
import {client} from '../components/lib/client';
import { Product,FooterBanner,HeroBanner } from '../components'
const Home = ({ products, bannerData }) => 
   (
    <>
     <HeroBanner   heroBanner={bannerData.length && bannerData[0] }/>

 

    <div className='heading'>
      <h2>Smartphone Deals</h2>
      <p> Grab yours!</p>
    </div>
  
    <div className='products_container'>

      {products?.map((product)=><Product key={product.id} product={product}/>)}
    </div>

    {/* <FooterBanner/> */}
    </>
);
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home