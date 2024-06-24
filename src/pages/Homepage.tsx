import React, { useEffect, useMemo, useState } from 'react'
import {Link, NavLink,Outlet} from 'react-router-dom'
import axios from 'axios'
import Carosel from '../components/Carosel';
import Categories from '../components/Categories';
import Spinner from '../components/Spinner';
import Errorpage from '../components/Errorpage';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { GoArrowUpRight } from "react-icons/go";
// import {CustomRightArrow} from '../components/utils/CustomRightArrow'
// import '../index.css'
const Homepage = () => {
    type productType={
            [category: string]: any[];
    }
    const [categories,setcategories]=useState([]);
    const [products,setproducts]=useState<productType>({});
    const [loading,isloading]=useState(false);
    const [error,seterror]=useState<any>(null)
    const baseurl=import.meta.env.VITE_Base_Api_URI

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
    const fetchrequests=useMemo( async ()=>{
        // const response= await fetch(`${baseurl}/products/category-list`)
            const response= await fetch(`${baseurl}/products/categories`)
            const cat=await response.json()
            setcategories(cat)
            let p:any={}
            const a=await cat.map(async (c:any)=>{
                const response= await fetch(`${baseurl}/products/category/${c}?limit=4`)
                const prods=await response.json()
                // p=[...p , ...prods]
                p[c]=prods
                // setproducts((prevprod)=>[...prevprod,...prods])
                console.log(c) 
                // p[c]=prods
            })
            await Promise.all(a)
            setproducts(p)
    },[])
    useEffect(()=>{
        const a= async ()=>{
            isloading(true)
            try{
                await fetchrequests
            }
            catch(e){
                seterror(e)
            }
            finally{
                isloading(false)
            }
    }
    a();
},[]);
let parr=[]
if(loading){
    return (
    <div className='flex items-center justify-center mt-96'>
        <Spinner/>
    </div>)
}
if(error){
    return(
        <div>
            <Errorpage error={error}/>
        </div>
    )
}
  return (
    // <div className=''>
    // <input type='search'/>
    // <h1>{JSON.stringify(categories)}</h1>
    // <div>
    //     {products.map((pd:any)=>
    //         <h1 key = {JSON.stringify(pd)} className='font-bold'><Link  to={`/product/${pd.id}`}>{pd.title}</Link></h1>
    //     )}
    // </div>
    // </div>
    <div className='relative h-screen overflow-y-scroll bg-flipkart no-scrollbar'>
        <Navbar/>
        {/* <div className='h-[15%] mt-20 border-b-2 border-gray-300 bg-flipkart'>
            <Categories categories={categories}/>
        </div> */}
        <div className='flex mt-20 justify-center items-center h-[65%] border-b-2 border-flipkart bg-flipkart'>
            <Carosel/>
        </div>
        <div className='h-auto border-b-2 bg-flipkart'>
            {categories.map((category:any,index:any)=>(
                <div key={index}>
                <Link to={`/products/${category}`}>
                <div className='flex justify-between pl-16 pr-16 text-4xl font-semibold text-indigo-700 mt-14 mb-14 hover:text-indigo-500'>
                    <div>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</div>
                    <div className='hover:text-blue-200'> <GoArrowUpRight /></div>
                </div>
                </Link>
                <div className='z-0 w-3/4 m-auto '>
                <Carousel  className='shadow-xl bg-flipkart rounded-xl' responsive={responsive} removeArrowOnDeviceType={["","tablet", "mobile"]}>
                {products[category].map((product:any,index:any)=>(
                <div key={index}>
                    {/* <Link to={`/product/${product.id}`}><img src={product.image} draggable='false'/></Link> */}
                    {/* {JSON.stringify(product)} */}
                    <Card product = {product}/>
                </div>
            ))}
            </Carousel>
            </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Homepage


{/* <div className='h-[92%] ml-32 mr-32 border border-gray-300 shadow-2xl'> */}

/*
 <div className='w-full h-screen bg-flipkart'>
        <div className='h-[8%] bg-slate-50 border-b-2 border-gray-300'>
            Navbar
        </div>
        <div className='h-[15%] border-b-2 border-gray-300   bg-flipkart'>
            Categories
        </div>
        grid-cols-12
        <div className='flex justify-center items-center h-[65%] border-b-2 border-gray-300 bg-flipkart'>
            <Carousel/>
        </div>
        <div className='flex justify-center items-center border-b-2 h-[20%] bg-flipkart'>
            <Carousel/>
        </div>
    </div>
flex items-center justify-center

    */