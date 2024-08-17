import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../../components/lib/client";
import SearchProd from "../../components/SearchProd";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

const Page = ({ products }) => {
  const router = useRouter();
  const { type } = router.query;
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    let sorted = [...products];

    if (sortOrder === "lowToHigh") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sorted);
  }, [sortOrder, products]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = sortedProducts.filter(
    (item) => item.category.toLowerCase() === type
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

      {/* Sort Dropdown */}
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="sort">Sort by Price: </label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Animated Product Listing */}
      <div className="product-list">
        {filteredProducts?.map((item) => (
          <motion.div
            key={item.slug.current}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SearchProd product={item} />
          </motion.div>
        ))}
      </div>
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
