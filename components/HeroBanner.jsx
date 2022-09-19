import React from 'react'
import { urlFor } from './lib/client'
const HeroBanner = ({heroBanner}) => {
  return (
    <> 
   
<div className='herobanner-container'>
   <img src= {urlFor(heroBanner.image)}/>
</div>

    </>


  )
}

export default HeroBanner