import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContest } from '../../context/StoreContest'
import axios from 'axios'
import { assets } from '../../assets/assets'
const MyOrders = () => {
    const {url , token} = useContext(StoreContest);
    const [data , setData] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchOrders = async()=>{
        setLoading(true)
        try {
            console.log("Fetching orders with token:", token)
            const response = await axios.get(url + "/api/order/userorders", {
                headers: { token }
            })
            console.log("Order fetch response:", response.data)
            setData(response.data.data || [])
            setError("")
        } catch (err) {
            console.error("Failed to load orders:", err)
            setError(err.response?.data?.message || err.message || "Unable to fetch orders")
            setData([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        console.log("MyOrders mounted, token:", token)
        if (token) {
            fetchOrders();
        }
    }, [token])
    return (
      <div className='my-orders'>
    <h2>My Orders</h2>
    <div className="container">
        {data.map((order,index)=>{
            return(
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item , index)=>{
                        if(index === order.items.length -1)
                        {
                            return item.name+" x "+ item.quantity 
                        }
                        else{
                            return item.name+" x "+ item.quantity +", "
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button>Track Order </button>
                </div>
            )
        })}
    </div>
          
      </div>
    )
}

export default MyOrders
