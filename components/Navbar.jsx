import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'
import {motion} from 'framer-motion'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <>
    <div className="navbar-container">
   <Link href="/"> 

<motion.div>  
    <p className='logo-text'>SIGMA</p>  
      </motion.div>
   
    

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