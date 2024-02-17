import React, { useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../components/lib/client";
import Image from "next/image";
import SearchProd from "../../components/SearchProd";

const Page = ({ products }) => {


  const router = useRouter();
  const { type } = router.query;

  products = products.filter(
    (item) => item.category.toLocaleLowerCase() == type
  );

  return (
    <div className="category-page">
      {products?.map((item) => (
        <SearchProd key={item.slug.current} product={item} />
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default Page;
