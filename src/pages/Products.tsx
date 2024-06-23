import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Card from '../components/Card';

const Products = () => {
    const baseurl=import.meta.env.VITE_Base_Api_URI
    const params=useParams();
    const cat=params.categoryid;
    const [isloading,setisloading]=useState(false)
    const [products,setproducts]=useState<any>()
    const fetchrequest= useCallback(async ()=>{
        setisloading(true)  
        const fetchsimilarproducts= await fetch(`${baseurl}/products/category/${cat}`)
        const resp=await fetchsimilarproducts.json()
        setproducts(resp)
        console.log('exec')
        setisloading(false)
    },[cat])
    
    useEffect(()=>{
        fetchrequest()
        },[cat])
    if(isloading || !products){
        return (
            <div className='flex items-center justify-center mt-96'>
                <Spinner/>
            </div>)
    }
  return (
    <div className='h-screen overflow-y-scroll no-scrollbar'>
        <Navbar/>
        <div className='grid grid-cols-1 mt-40 ml-10 mr-10 md:grid-cols-3'>
            {products.map((prod:any)=>(
                <Card product={prod}/>
            ))}
        </div>
    </div>
  )
}

export default Products