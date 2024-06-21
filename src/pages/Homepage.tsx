import React, { useEffect, useMemo, useState } from 'react'
import {Link, NavLink,Outlet} from 'react-router-dom'
import axios from 'axios'

const Homepage = () => {
    const [categories,setcategories]=useState([]);
    const [products,setproducts]=useState([]);
    const [loading,isloading]=useState(false);
    const baseurl=import.meta.env.VITE_Base_Api_URI
    const fetchrequests=useMemo(async ()=>{
        isloading(true)
        // const response= await fetch(`${baseurl}/products/category-list`)
        const response= await fetch(`${baseurl}/products/categories`)
        const cat=await response.json()
        setcategories(cat)
        let p:any=[]
        const a=await cat.map(async (c:any)=>{
            const response= await fetch(`${baseurl}/products/category/${c}?limit=2`)
            const prods=await response.json()
            // p=[...p , ...prods['products']]
            p=[...p , ...prods]
            // setproducts((prevprod)=>[...prevprod,...prods])
            console.log(c)
        })
        await Promise.all(a)
        setproducts(p)
        
    },[])
    useEffect(()=>{
        const a= async ()=>{
            await fetchrequests
            isloading(false)
    }
    a();
},[]);
if(loading){
    return <h1>LOADING......</h1>
}
  return (
    <div className=''>
    <input type='search'/>
    <h1>{JSON.stringify(categories)}</h1>
    <div>
        {products.map((pd:any)=>
            <h1 key = {JSON.stringify(pd)} className='font-bold'><Link  to={`/product/${pd.id}`}>{pd.title}</Link></h1>
        )}
    </div>
    </div>
  )
}

export default Homepage