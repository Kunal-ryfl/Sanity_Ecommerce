import React from 'react'
import { urlFor } from './lib/client'

const FooterBanner = ({footerBanner}) => {
  return (
    <>
   <div className='herobanner-container'>
    <div className='herobanner-container-text' >
   
        <h2>  {footerBanner.smallText}.</h2>
        <h1>  {footerBanner.midText} </h1>
        <p> 
          {footerBanner.desc}
        </p>

        <h3>{footerBanner.largeText2}.....</h3>
</div>
   <img id='image' loading="lazy" src= {urlFor(footerBanner.image)}/>
   
</div>
    </>
  )
}

export default FooterBanner
