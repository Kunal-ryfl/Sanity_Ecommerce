import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import Search from "./Search";

const Navbar = () => {
  const { totalQuantities } = useStateContext();
  return (
    <>
      <div className="navbar-container">
        <div style={{display:"flex", gap:'6px', alignItems:'center'}}>
          <Link href="/">
            <div>
              <p className="logo-text">SIGMA</p>
            </div>
          </Link>
          <Search />
        </div>

        <Link href={`/cart`}>
          <button className="cart-icon">
            <AiOutlineShopping />
            <span className="qty">{totalQuantities} </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
