
import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';


import { useStateContext } from '../context/StateContext';
import { urlFor } from './lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext();

  return (
    <>
    <div className="cart-container" ref={cartRef}>

    <div className="cart-product-container">
    <div className="cart-product-container-left">




    {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={100} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                className="button"
              >
                Take me to Home!
              </button>
            </Link>
          </div>
        )}











       {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="cart-product" key={item._id}>
              
              <div className="cart-product-left">
                   <img src={urlFor(item?.image[0])} className="cart-product-image"/>
              </div>
           
           <div className="cart-product-right">
              <h2>${item.price}</h2>
              <h3>{item.name}</h3>
           </div>
              
            </div>



          ))}
    </div>


   
    <div className="cart-product-container-right">
       <h1>PRICE DETAILS</h1>
       <div className="cart-checkout">
               

              <h4> Price :-     ${totalPrice} </h4>      
              <h4> Delivery Charges :-   FREE</h4>      
              <h4> Discount :- $0 </h4>
              <h3> Total Amount :- ${totalPrice}</h3>
           </div>
    </div>
          



    </div>


    </div>
    </>
  )
}

export default Cart