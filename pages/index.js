import React from "react";
import { client } from "../components/lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    <div className="heading">
    </div>

    <div className="products_container">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>

    <FooterBanner footerBanner={bannerData.length && bannerData[1]} />
  </div>
);
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
