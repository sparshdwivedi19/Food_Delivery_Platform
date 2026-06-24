import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";


import './Navbar.css'
import { StoreContest } from '../../context/StoreContest';
import { Profiler } from 'react';
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("Home");
  const {getTotalCartAmount , token , setToken} = useContext(StoreContest);
  const navigate = useNavigate();
  const logout = ()=>{
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
  }
  return (
    <div className='navbar'>
    <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
     <ul className="navbar-menu">
        <li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</li>
        <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("Mobile App")} className={menu==="Mobile App"?"active":""}>Mobile App</li>
        <li onClick={()=>setMenu("Contact us")} className={menu==="Contact us"?"active":""}>Contect us</li>
     </ul>
     <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
           <Link to="/cart"><img src={assets.basket_icon} alt="" /> </Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=> setShowLogin(true)}>sign in</button>:
        <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
               <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
               <hr />
               <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul> 
         </div>}
        
     </div>
    </div>
  )
}

export default Navbar
