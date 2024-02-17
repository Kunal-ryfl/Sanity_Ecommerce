import React, { useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../components/lib/client";
import Image from "next/image";
import SearchProd from "../../components/SearchProd";
import { IoIosArrowForward } from "react-icons/io";

const Page = ({ products }) => {
  const router = useRouter();
  const { type } = router.query;

  products = products.filter(
    (item) => item.category.toLocaleLowerCase() == type
  );

  return (
    <div className="category-page">
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <p style={{ fontSize: "14px", fontWeight: "bolder", color: "gray" }}>
          Home
        </p>
        <IoIosArrowForward />
        <p style={{ fontSize: "14px", fontWeight: "bolder", color: "gray" }}>
          Category
        </p>
        <IoIosArrowForward />

        <p style={{ fontSize: "14px", fontWeight: "bolder", color: "gray" }}>
          {type}s
        </p>
      </div>

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
