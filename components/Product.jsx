import React from "react";
import Link from "next/link";
import { urlFor } from "./lib/client";
import Image from "next/image";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image src={`${urlFor(image && image[0])}`}  height={200} width={200} alt="" loading="lazy" className="product-image" />
          <p className="product-name">{name}</p>
          <p className="product-price">₹{price}</p>
        </div>
      </Link>
    </>
  );
};

export default Product;
