import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <img src={assets.logo} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam vel molestias impedit praesentium earum vero inventore, eveniet qui iure nihil consectetur, dolor at tenetur maxime culpa placeat delectus accusantium. Provident.</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>Contact us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
        </div>
        <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+1-212-965-8620</li>
            <li>contact@tomato.com</li>
        </ul>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">Copyright © 2024 tomato.com — All Rights Reserved</div>
    </div>
  )
}

export default Footer
