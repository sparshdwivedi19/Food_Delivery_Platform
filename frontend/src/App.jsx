import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import Verify from './pages/verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

function App() {

  const [showLogin , setShowLogin] = useState(false)
  return (
  <>  
  {showLogin?<LoginPopup setShowLogin = {setShowLogin}/>:<></>}
   <div className="App">
    <Navbar setShowLogin = {setShowLogin}/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Cart' element={<Cart/>}/>
    <Route path='/Order' element={<PlaceOrder/>}/>
    <Route path='/verify' element={<Verify/>}/>
    <Route path='/myorders' element={<MyOrders/>}/>
    <Route path='*' element={<Home/>}/>
    </Routes>

   </div>
   <Footer/>
  </>
  );
}

export default App;
