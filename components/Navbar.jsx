import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { totalQuantities } = useStateContext();
  return (
    <>
    <div className="navbar-container">
   <Link href="/"> 
     <div>  
    <p className='logo-text'>SIGMA</p>  
      </div>
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
