import React from 'react'
import { urlFor } from './lib/client'
import Image from 'next/image'
const HeroBanner = ({heroBanner}) => {
  return (
    <> 
<div className='herobanner-container'>
   <img src= {urlFor(heroBanner.image)} />
   <div className='herobanner-container-text' >
   
        <h2> introducing {heroBanner.smallText}.</h2>
        <h1>  {heroBanner.midText} </h1>
        <p> 
          {heroBanner.desc}
        </p>

        <h3>{heroBanner.largeText2}.....</h3>
        <h4 className="morse"> -.-. --- -- .. -. --. / --- -. / .---- ..--- / .--- ..- .-.. -.-- </h4>
</div>
</div>

    </>


  )
}

export default HeroBanner