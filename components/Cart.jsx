import React, { useRef, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineMinus,
   AiOutlinePlus
} from "react-icons/ai";


import { useStateContext } from "../context/StateContext";
import { urlFor } from "./lib/client";

const Cart = (product) => {
  const { totalPrice, totalQuantities, onRemove, cartItems,setCartItems ,toggleAdd,toggleMinus,HandleCheckOut} =
    useStateContext();

  return (
    <>
      <div className="cart-container">
    
        <div className="cart-product-container">
          <div className="cart-product-container-left">
            
            {cartItems.length < 1 &&  (
              <div className="empty-cart">
                <AiOutlineShopping size={150} />
                <h3>Your shopping cart is empty!</h3>
                <Link href="/">
                  <button type="button" className="blue-button">
                    TAKE ME TO HOME
                  </button>
                </Link>
              </div>
            )}

            {cartItems.length >= 1 &&
          
              cartItems.map((item) => (
                <div className="cart-product" key={item._id}>
                  <div className="cart-product-left">
                    <img
                      src={urlFor(item?.image[0])}
                      className="cart-product-image"
                    />
                  </div>

                  <div className="cart-product-right">
                    <h2>${item.price}</h2>
                    <h3>{item.name}</h3>
                    <h3><div className="qty-btn"><AiOutlineMinus  onClick={()=>toggleMinus(item._id)} cursor={"pointer"}/> {item.quantity} <AiOutlinePlus onClick={()=>toggleAdd(item._id)} cursor={"pointer"}/></div></h3>
                    
                    <button
                      className="white-button"
                      onClick={() => onRemove(item)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* conditional rendering using ternary opeartion in nextjs */}

          <div className="cart-product-container-right">
            {cartItems.length >= 1 ? (
              <>
                <h2>Order Summary </h2>
                <div className="cart-checkout">
                  <table>
                    <tr>
                      <td> Price</td>
                      <td> ${totalPrice}</td>
                    </tr>
                    <tr>
                      <td> Delivery Charges</td>
                      <td> Free</td>
                    </tr>
                    <tr>
                      <td> Discount</td>
                      <td> $0</td>
                    </tr>
                    <tr>
                      <td> Total items</td>
                      <td> {totalQuantities} items</td>
                    </tr>
                  </table>

                  <h3> Total Amount&emsp; ${totalPrice}/-</h3>
                  <button className="cout-btn"  onClick={() => HandleCheckOut()} > CHECKOUT </button>
                </div>
              </>
            ) : (
              <> </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
