import Image from "next/image";
import React from "react";
import { urlFor } from "./lib/client";
import Link from "next/link";
const SearchProd = ({ product }) => {
  return (
    <Link href={`/product/${product.slug.current}`}>
      <div className="search-prod">
        <div className="search-prod-1">
          <Image
            src={`${urlFor(product?.image && product?.image[0])}`}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8sv5KPQAHjgLYUdlBYAAAAABJRU5ErkJggg=="
            height={150}
            width={150}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="search-prod-2">
          <h1>{product?.name}</h1>
          <p>{product?.details}</p>
        </div>

        <div className="search-prod-3">
          <p>{product?.name}</p>
          <h1>₹{product?.price}</h1>
        </div>
      </div>
    </Link>
  );
};

export default SearchProd;
