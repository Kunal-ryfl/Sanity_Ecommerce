import React from "react";
import { useState, useEffect } from "react";
import { client } from "./lib/client";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { urlFor } from "./lib/client";
import Image from "next/image";
import SearchModal from "./SearchModal";

const Search = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    show
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
  }, [show]);
  
  // const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  async function searchProducts(e) {
    let val = e.target.value;

  //   if(val===""){
  //     searchProducts([])
  //     return;
  // }

    // setSearch(val);
    // console.log("b ",search);

    const query = `*[_type == "product" && name match ("^${val}*")]`;
    const response = await client.fetch(query);

    setProducts(response);
    // console.log(products);
  }

  return (
    <div
      style={{ position: "", zIndex: 10, backgroundColor: "red" }}
    >
      <SearchModal/>
      {show ? (
        <div style={{ position:'absolute',padding:'10px', inset:0, display: "flex", justifyContent:'center', alignItems:'center',  gap: "6px", background:'black',alignItems: "center" }}>
          <input
            style={{
              padding: " 5px 10px 4px 4px ",
              fontSize: "16px",
              width: "100%",
              outline: "none",
              borderRadius: "4px",
              border: "none",
              maxWidth: "450px",
              top: 10,
            }}
            placeholder="search iphone... "
            type="text"
            onChange={(e) => searchProducts(e)}
          />
          <div>
            <MdOutlineCancel
              style={{ cursor: "pointer", scale: "1.5" }}
              onClick={() => (setShow(false), setProducts([]))}
            />
          </div>
        </div>
      ) : (
        <BsSearch
          style={{ cursor: "pointer", scale: "1.3" }}
          onClick={() => setShow(true)}
        />
      )}
      <div
        style={{
          position: "absolute",
          width: "60%",
          padding: "5px",
          backgroundColor: "white",
          cursor: "pointer",
          top: "45px",
          display: products.length > 0 ? "" : "none",
        }}
      >
        {products.map((item, index) => (
          <Link href={`/product/${item.slug.current}`} key={index}>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
              onClick={() => setProducts([], setShow(false))}
            >
              <Image
                src={`${urlFor(item.image && item.image[0])}`}
                // style={{ height: "30px", width: "30px" }}
                height={30}
                width={30}
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8sv5KPQAHjgLYUdlBYAAAAABJRU5ErkJggg=="
                placeholder="blur"
                alt=""
              />
              <h1
                style={{
                  fontSize: "15px",
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                {item.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
