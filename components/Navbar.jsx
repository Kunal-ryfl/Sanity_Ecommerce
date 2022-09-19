import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'

const Navbar = () => {
  return (
    <>
    <div className="navbar-container">
    SIGMA 

    <button className='cart-icon' onClick="">
         <AiOutlineShopping/> 
         <span className='qty'>0 </span>
    </button>

    </div>

 
    </>
  )
}

export default Navbar