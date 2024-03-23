import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { urlFor } from "./lib/client";
import Image from "next/image";
import { client } from "./lib/client";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import  { ImCancelCircle }from "react-icons/im";


const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
   const [loading,setLoading] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      setIsOpen(false);
    }
  };

  const [products, setProducts] = useState([]);
  async function searchProducts(e) {
    setLoading(true)
    let val = e.target.value;

    // console.log("a ", val);
    // setSearch(val);
    // console.log("b ",search);

    const query = `*[_type == "product" && name match ("^${val}*")]`;
    const response = await client.fetch(query);

    setProducts(response);
    setLoading(false)
    // console.log(products);
  }
  return (
    <>
      <button style={{border:'none',backgroundColor:'black'}} onClick={openModal}> <BsSearch color='white' size='18px' cursor='pointer' /> </button>
      {isOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Search</h2>
            <input type="text" placeholder="Search..." 
                onChange={(e) => searchProducts(e)}
            />
          <div  style={{color:'black'}}>
     
          {
          loading &&< div style={{display:'flex',gap:'10px' , alignItems:'baseline'}}> < AiOutlineLoading3Quarters  className="rotating-icon" /> <p style={{marginTop:'10px'}}>loading...</p> </div>
         }

         {
          !loading  && products.length<1 && < div style={{display:'flex',gap:'10px' , alignItems:'baseline'}}> <ImCancelCircle /> <p style={{marginTop:'10px'}}>nothing here</p> </div>
         }

        { !loading && products.map((item, index) => (
          <Link href={`/product/${item.slug.current}`} key={index}>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                cursor:'pointer'
              }}
              onClick={() => setProducts([])}
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
          </div>
        
      )}
    </>
  );
};

export default SearchModal;
