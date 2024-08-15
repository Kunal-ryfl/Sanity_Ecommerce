import React from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import Image from "next/image";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../components/lib/client";
const CartDetails = () => {
  const {
    totalPrice,
    totalQuantities,
    onRemove,
    cartItems,
    toggleAdd,
    toggleMinus,
    HandleCheckOut,
  } = useStateContext();


  let disabled =  cartItems?.length===0;
  return (
    <>
      <div className="cart-container">
        <div className="cart-product-container">
          <div className="cart-product-container-left">
            <h2 style={{ fontSize: "20px", margin: "10px 0px 40px 10px" }}>
              YOUR CART
            </h2>
            {cartItems.length < 1 && (
              <div className="empty-cart">
                <AiOutlineShopping size={150} />
                <h3>Your cart is empty!</h3>
                <Link href="/">
                  <button type="button" className="take-me_home-btn">
                    continue shopping
                  </button>
                </Link>
              </div>
            )}

            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className="cart-product" key={item._id}>
                  <div className="cart-product-left">
                    <Link href={`/product/${item.slug.current}`}>
                      <Image
                        src={`${urlFor(item?.image[0])}`}
                        className="cart-product-image"
                      width={200}
                      height={200}
                      alt=""
                      />
                    </Link>
                  </div>

                  <div className="cart-product-right">
                    <h2>₹{item.price}</h2>
                    <h3>{item.name}</h3>
                    <h3>
                      <div className="qty-btn">
                        <AiFillMinusCircle
                          size={22}
                          onClick={() => toggleMinus(item._id)}
                          cursor={"pointer"}
                        />{" "}
                        {item.quantity}{" "}
                        <AiFillPlusCircle
                          size={22}
                          onClick={() => toggleAdd(item._id)}
                          cursor={"pointer"}
                        />
                      </div>
                    </h3>

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
            {cartItems.length >= 0 ? (
              <>
                <h2>Order Summary </h2>
                <div className="cart-checkout">
                  <table>
                    <tr>
                      <td> Price</td>
                      <td> ₹{totalPrice}</td>
                    </tr>
                    <tr>
                      <td> Delivery Charges</td>
                      <td> Free</td>
                    </tr>
                    <tr>
                      <td> Discount</td>
                      <td> ₹0</td>
                    </tr>
                    <tr>
                      <td> Total items</td>
                      <td> {totalQuantities} items</td>
                    </tr>
                  </table>

                  <h3> Total Amount&emsp; ₹{totalPrice}/-</h3>
                  <button disabled={disabled} className={!disabled?"cout-btn":"cout-btn-disabled"} onClick={() => HandleCheckOut()}>
                    CHECKOUT
                  </button>
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

export default CartDetails;
