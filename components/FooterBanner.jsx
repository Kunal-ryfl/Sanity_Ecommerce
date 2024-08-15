import React from "react";
import { urlFor } from "./lib/client";
import Link from "next/link";
const FooterBanner = ({ footerBanner }) => {
  return (
    <>
      <div className="herobanner-container">
        <div className="herobanner-container-text">
          <h2> {footerBanner.smallText}.</h2>
          <h1> {footerBanner.midText} </h1>
          <p>{footerBanner.desc}</p>

          {/* <h3>{footerBanner.largeText2}.....</h3> */}

          <div>
            <Link href={"/product/cmf-watch-pro-2"}>
              <button
                style={{
                  background: "#ff6600",
                  border: "0px",
                  color: "white",
                  fontWeight: "bolder",
                  padding: "7px 16px",
                  cursor: "pointer", // Make the cursor a pointer on hover
                  transition: "background-color 0.3s ease", // Smooth transition for background color change
                }}
                onMouseEnter={(e) => (e.target.style.background = "black")} // Change background to black on hover
                onMouseLeave={(e) => (e.target.style.background = "#ff6600")} // Revert to original color on hover out
              >
                BUY NOW
              </button>
            </Link>
          </div>
        </div>
        <img
          className="footerbannerImg"
          id="image"
          loading="lazy"
          src={urlFor(footerBanner.image)}
        />
      </div>
    </>
  );
};

export default FooterBanner;
