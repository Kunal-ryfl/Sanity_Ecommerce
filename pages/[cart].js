import React from 'react'
import { Cart } from '../components'
import {motion} from 'framer-motion'

const CartDetails = () => {


  return (
    <motion.div   initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>  
    <Cart/>
    </motion.div>
  )
}

export default CartDetails