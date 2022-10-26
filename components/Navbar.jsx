import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'

import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <>
    <div className="navbar-container">
    <Link href="/"> 
     <p className='logo-text'>SIGMA</p>
      </Link>
   
  

    <Link href={`/cart`}  >
    <button className='cart-icon'>
         <AiOutlineShopping/> 
         <span className='qty'>{totalQuantities} </span>
    </button>
    </Link>

    </div>
   
    </>
  )
}

export default Navbar