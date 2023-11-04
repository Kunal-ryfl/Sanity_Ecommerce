import React, { useEffect, useState } from "react";
import { client } from "../components/lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  const AllProducts = products;
  const [category, setCategory] = useState("All");
  const [pro, setPro] = useState(products);
  const [value, setValue] = useState(15000);

  useEffect(() => {
    // console.log(value)
    const temp = AllProducts;

    let data = temp.filter((x) => x.price >= value );

    if(category !== "All"){
      data = data.filter((x)=>(x.category === category))
    }

    setPro(data);
  }, [value]);

  useEffect(() => {
    // console.log("UE = ", category);
    const temp = AllProducts;

    if (category === "All") {
      let arr = AllProducts;
      arr = arr.filter((x) => (x.price >= value) )
      setPro(arr);
      return
    }
    let data = temp.filter((x) => x.category === category && x.price >= value);
    setPro(data);
  }, [category]);

  const filter = (e) => {
    setCategory(e.currentTarget.value);
  };

  function filterPrice(e) {
    setValue(e.currentTarget.value);
  }

  

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="heading"></div>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          padding: "14px 25px",

        }}
      >
        <select onChange={filter} name="category" id="category">
          <option value="All">All</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Other">Other</option>
        </select>

      
        <div class="slidecontainer">
          <input
            type="range"
            min="15000"
            max="200000"
            value={value}
            onChange={filterPrice}
            class="slider"
            id="myRange"
          />
        </div>
        <p style={{ fontSize:'14px'}}>
        ₹{value}
        </p>
      </div>

      <div className="products_container">
        {pro?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[1]} />
    </div>
  );
};
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
