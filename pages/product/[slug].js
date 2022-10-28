import React, { useState } from "react";
import { client, urlFor } from "../../components/lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { animate, motion } from "framer-motion";

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


const Productdetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  return (
    <motion.div
      initial="initial"
      animate= "animate"
      exit={{ opacity: 0 }}
    >
      <div className="product-details-container">
        <div className="small-images-container">
          {image?.map((item, i) => (
            <img
              key={i}
              src={urlFor(item)}
              className={i === index ? "selected-image" : "small-image"}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
        <div className="left">
          <motion.div
            variants={fadeInUp}
            className="product-detail-image-container"
          >
            <img src={urlFor(image && image[index])} />
          </motion.div>
        </div>

        <div className="right">
          <div className="right-card">
            <pre className="configuration">Device Configuration...</pre>
            <h1 className="product-detail-device-name"> {name} </h1>
            <p className="product-detail-device-detail">{details}</p>

            <h1 className="product-detail-device-price">${price}</h1>

            <button className="blue-button" onClick={() => onAdd(product, qty)}>
              ADD TO CART
            </button>
            <button className="white-button">BUY NOW</button>
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
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};
export default Productdetails;
