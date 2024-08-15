import React from "react";
import { urlFor } from "./lib/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroBanner = ({ heroBanner }) => {
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
  return (
    <>
      <div className="herobanner-container">
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            flexDirection: "column",
            justifyContent: "center",
            padding: "15px",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              fontFamily: "Raleway Dots, sans-serif",
            }}
          >
            WONDERFUL
          </h4>
          <h4> BY DESIGN</h4>
        </div>

        <motion.img 
   initial={{ scale: 1.12,opacity:0 }} 
   animate={{ scale: 1 ,opacity:1 }}   
   transition={{ 
     duration: 0.6, 
     ease: "easeOut", 
     type: "spring", 
     stiffness: 100,  
     damping: 10 
   }}
  
  src={urlFor(heroBanner.image)} />

        <div className="herobanner-container-text">
        <motion.div 
  initial={{ opacity: 0, y: 50 }} // Start invisible and slightly below their final position
  animate={{ opacity: 1, y: 0 }}   // Fade in and move up to their final position
  transition={{
    delay: 0.3, // Slight delay after the image animation
    duration: 0.6, 
    ease: "easeOut" 
  }}
>
  <h2> {heroBanner.smallText}.</h2>
  <h1> {heroBanner.midText} </h1>
  <p>{heroBanner.desc}</p>
</motion.div>

          <div>
            
            <Link href={"/product/cmf-phone-1-5g"}>
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

          <h4 className="morse"></h4>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
