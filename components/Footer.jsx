import React from 'react'
import { AiFillInstagram,AiOutlineTwitter ,AiFillFacebook} from 'react-icons/ai'
const Footer = () => {
  return (
    <>
    
    <div className="footer-container">
      <p>Copyright © 2022 SIGMA. All rights reserved.</p>
   
      <div className="icons">
          <AiFillFacebook/>
      <AiOutlineTwitter/>
      <AiFillInstagram/>
      </div>
    
    </div>
    </>
  )
}

export default Footer