import React from "react";
import { useState } from "react";
import { client } from "./lib/client";
import Link from "next/link";
const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  async function searchProducts(e) {
    setSearch(e.target.value);
    // console.log(search);

    const query = `*[_type == "product" && name match ("^${search}*")]`;
    const response = await client.fetch(query);

    setProducts(response);
    // console.log(products);
  }

  return (
    <div style={{ position: "relative", width: "150px" }}>
      <input
        style={{
          padding: " 4px 10px 4px 4px ",
          fontSize: "15px",
          width: "100%",
          outline: "none",
          borderRadius: "6px",
        }}
        value={search}
        placeholder="search products"
        type="text"
        onChange={searchProducts}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          padding: "5px",
          backgroundColor: "white",
          cursor: "pointer",
          top: "30px",
          display: products.length > 0 ? "" : "none",
        }}
      >
        {products.map((item,index) => (
          <Link href={`/product/${item.slug.current}`} key={index}>
            <div style={{ marginTop: "15px" }} onClick={() => setProducts([])}>
              <h1 style={{ fontSize: "15px", color: "black" }}>{item.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
