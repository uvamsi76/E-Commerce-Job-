import { useCallback, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

const Productpage = () => {
    const params=useParams();
    const prodid=params.productid;
    const baseurl=import.meta.env.VITE_Base_Api_URI
    const [product,setproduct]=useState()
    const [category,setcategory]=useState('')
    const [similarprods,setsimilarprods]=useState([])
    const [isloading,setisloading]=useState(false)

    const fetchrequest= useCallback(async ()=>{
        setisloading(true)
        const fetchproddet= await fetch(`${baseurl}/products/${prodid}`)
        const response=await fetchproddet.json()
        setproduct(response)
        const cat=response.category
        setcategory(cat)   
        const fetchsimilarproducts= await fetch(`${baseurl}/products/category/${cat}`)
        const resp=await fetchsimilarproducts.json()
        setsimilarprods(resp)
        console.log('exec')
        setisloading(false)
    },[prodid])
    
    useEffect(()=>{
        fetchrequest()
        },[])
    if(isloading){
        return <h1>Loading....</h1>
    }
  return (
    <div>
        <h1>Product</h1>
        <h1>{JSON.stringify(product)}</h1>
        <h1>Similar Products</h1>
        <h1>{JSON.stringify(similarprods)}</h1>
        <h1>category: {JSON.stringify(category)}</h1>
    </div>
  )
}

export default Productpage