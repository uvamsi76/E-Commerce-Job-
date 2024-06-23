import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { getCookie } from '../utils/cookie'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'

const Cartpage = () => {
    const [cart,setcart]=useState([])
    const [products,setproducts]=useState([])
    const [isloading,setisloading]=useState(false)
    const userid=getCookie('userid')
    const baseurl=import.meta.env.VITE_Base_Api_URI
    
    useEffect(()=>{
        let isCancelled=false;
        const fetchusercart=async()=>{
            setisloading(true)
            const usercart=await axios.get(`${baseurl}/carts/user/${userid}`)
            if(!isCancelled){
            setcart(usercart.data[0])
            const prods=usercart.data[0].products
            // console.log(prods)
            let p:any=[]
            const a=prods.map(async (prod:any)=>{
                const req=await axios.get(`${baseurl}/products/${prod.productId}`)
                const data=await req.data
                p=[...p,data]
            })
            await Promise.all(a)
            setproducts(p)
            setisloading(false)
        }
    }
        fetchusercart();
        return ()=>{
            isCancelled=true;
        };
    },[userid])
    if(isloading){
        return (
            <div className='flex items-center justify-center mt-96'>
                <Spinner/>
            </div>)
    }
    return (
    <div>
        <Navbar/>
        <div className='mt-40'>
        <div>
        <h1>Cart</h1>
            {JSON.stringify(cart)}
        </div>
        <div>
            <h1>Product</h1>
            {products.map((product:any)=>
                <h1 key={product.id}>{JSON.stringify(product)}</h1>)
            }
        </div>
        {/* <div>{JSON.stringify(products)}</div> */}
        </div>
    </div>
  )
}

export default Cartpage