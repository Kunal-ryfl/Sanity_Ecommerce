import React from "react";
import { urlFor } from "./lib/client";
import Image from "next/image";
import Link from "next/link";
const HeroBanner = ({ heroBanner }) => {
  return (
    <>
      <div className="herobanner-container">
        <div  style={{display:'flex', fontSize:'20px', flexDirection:'column', justifyContent:'center', padding:'15px', alignItems:'center', }}>
        <h4 style={{
  fontFamily: "Raleway Dots, sans-serif"
}}>WONDERFUL</h4>
         <h4> BY DESIGN</h4>
        </div>
        <img src={urlFor(heroBanner.image)} />
        <div className="herobanner-container-text">
          <h2> {heroBanner.smallText}.</h2>
          <h1> {heroBanner.midText} </h1>
          <p>{heroBanner.desc}</p>

          {/* <h3>{heroBanner.largeText2}.....</h3> */}

          <div>
            <Link href={"/product/cmf-phone-1-5g"}>
            <button style={{ 
    background: "#ff6600", 
    border:'0px', 
    color:'white', 
    fontWeight:'bolder', 
    padding:'7px 16px',
    cursor: 'pointer', // Make the cursor a pointer on hover
    transition: 'background-color 0.3s ease' // Smooth transition for background color change
}}
onMouseEnter={(e) => e.target.style.background = 'black'} // Change background to black on hover
onMouseLeave={(e) => e.target.style.background = '#ff6600'} // Revert to original color on hover out
>
BUY NOW
</button>

            </Link>
          </div>

          <h4 className="morse">
          </h4>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
