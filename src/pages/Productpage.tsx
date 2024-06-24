import { useCallback, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Button from '../components/utils/Button';
import { FaCartPlus } from 'react-icons/fa6';
import Qty from '../components/utils/Qty';
import { RiStarSFill } from "react-icons/ri";
// import { RiStarSLine } from "react-icons/ri";
import { getCookie } from '../utils/cookie';
import Card from '../components/Card';
import Carousel from 'react-multi-carousel';
import axios from 'axios';

const Productpage = () => {
    const params=useParams();
    const prodid=params.productid;
    const baseurl=import.meta.env.VITE_Base_Api_URI
    const [product,setproduct]=useState<any>()
    const [category,setcategory]=useState('')
    const [similarprods,setsimilarprods]=useState([])
    const [isloading,setisloading]=useState(false)
    const [qty,setqty]=useState(0)
    // const uid=getCookie('userid')
    // const [deliveryaddress,setdeliveryaddress]=useState([])
    const [isrefreshed,setisrefreshed]=useState(false)
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
        },[prodid])
        const onclicked=async ()=>{
            setisrefreshed(true)
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const cartid=getCookie('carts')
        const userid=getCookie('userid')
        const postdata:any={
            userId:userid,
            date:formattedDate,
            products:[{productId:product.id,quantity:qty}]
        }
        const addcart= await axios(`${baseurl}/carts/${cartid}`,postdata)
        console.log(addcart)
        }
        const getcount=(count:any,refresh:any)=>{
            setqty(count)
            setisrefreshed(refresh)
          }
    if(isloading || !product){
        return (
            <div className='flex items-center justify-center mt-96'>
                <Spinner/>
            </div>)
    }
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <div className='h-screen overflow-y-scroll no-scrollbar'>
        <Navbar/>
        <div className='mt-32 ml-8 md:ml-20 '>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='mt-24'>
                    <img className='pl-14 h-[50%] w-auto' src={`${product.image}`}/>
                    <div className='flex m-5 mt-20'>
                        <Qty getcount={getcount} refresh={isrefreshed}/>
                        <Button Click={onclicked} class='w-[40%] flex justify-center items-center'><FaCartPlus className='w-10 h-auto'/></Button>
                    </div>
                </div>
                <div className='mt-20 mr-20'>
                    <p className='font-mono text-5xl font-bold'>{product.title}</p>
                    <div className='flex mt-10 ml-1 text-3xl font-semibold'>
                        <p>{product.rating.rate}</p> 
                        <div className='flex ml-10'><RiStarSFill/><RiStarSFill/><RiStarSFill/><RiStarSFill/><RiStarSFill/> </div>
                        <p className='mt-1 ml-2 text-lg'>({product.rating.count})</p>
                    </div>
                    <div className='mt-12 font-serif text-6xl font-semibold'>
                        $ {product.price}
                    </div>
                    <div className='mt-14'>
                        <div className='mb-5 text-2xl font-semibold'>
                            product description -
                        </div>
                        <div className='font-serif text-lg'>
                            {product.description}
                        </div>
                    </div>
                </div>
                {/* <h1>Product</h1>
                <h1>{JSON.stringify(product)}</h1> */}
            </div>
            <div>
                <div className='mb-10 text-6xl font-bold'>
                    Similar Products
                </div>
                <div className=''>
                    <Carousel responsive={responsive}>
                    {similarprods.map((prod:any)=>(
                        <Card product={prod}/>
                    ))}
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Productpage

// {
//   "id":9,
//   "title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
//   "price":64,
//   "description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
//   "category":"electronics",
//   "image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//   "rating":{"rate":3.3,"count":203}
// }

// w-[100%] h-auto md:h-[80%] md:w-auto