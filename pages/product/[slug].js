import React, { useState, useEffect } from "react";
import { client, urlFor } from "../../components/lib/client";
import { useStateContext } from "../../context/StateContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineStar, AiFillStar, AiOutlineUser } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";

let easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Productdetails = ({ product }) => {
  // const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart, cartItems } =
    useStateContext();
    const [Loading,setLoading] = useState(true)
  const check = cartItems.find((item) => item._id === product._id);
  // console.log(product)
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <div className="product-details-container">
        <div className="small-images-container">
          {product.image?.map((item, i) => (
            <Image
              key={i}
              height={80}
              width={80}
              alt="img"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8sv5KPQAHjgLYUdlBYAAAAABJRU5ErkJggg=="
              src={`${urlFor(item)}`}
              className={i === index ? "selected-image" : "small-image"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <div className="left">
          <motion.div
            variants={fadeInUp}
            className="product-detail-image-container"
            >
            {
              Loading && <ClipLoader/>
            }

            <Image
              alt=""
              priority
              objectFit="contain"
              className=""
              style={{ display: Loading ? "none" : "block" }}
              onLoadingComplete={()=>setLoading(false)}
              layout="fill"
              src={`${urlFor(product.image && product.image[index])}`}
            />
          </motion.div>
          
        </div>

        <div className="right">
          <div className="right-card">
            <pre className="configuration">Device Configuration...</pre>
            <h1 className="product-detail-device-name"> {product.name} </h1>
            <p className="product-detail-device-detail">{product.details}</p>

            <h1 className="product-detail-device-price">₹{product.price}</h1>

            {!check ? (
              <button
                className="blue-button"
                onClick={() => onAdd(product, qty)}
              >
                ADD TO CART
              </button>
            ) : (
              <>
                {" "}
                <button className="grey-button">IN THE CART</button>{" "}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="review-container">
        <div className="review-container-left">
          <h1 className="Rating-text">4</h1>

          <div>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>

          <div>
            <p>
              <AiOutlineUser />
              132 Ratings
            </p>
          </div>
        </div>
        <div className="review-container-right">
          <div>
            <h1>Reviews(2)</h1>
          </div>

          <div className="review-text">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
            />
            <p>
              Amazing phone with great cameras and better battery which gives
              you the best performance. I just love the camera .
            </p>
          </div>
          <div className="review-text">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
            />
            <p>
              {" "}
              Really satisfied with the Product I received... It’s totally
              genuine and the packaging was also really good so if ur planning
              to buy just go for it.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  // const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  // const products = await client.fetch(productsQuery);

  //   console.log(product);

  return {
    props: { product },
  };
};

export default Productdetails;
