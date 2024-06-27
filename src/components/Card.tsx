import {  useState } from 'react'
import Button from './utils/Button';
import { FaCartPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Qty from './utils/Qty';
import { getCookie } from '../utils/cookie';
import axios from 'axios';
import { getdate } from '../utils/getdate';


const Card = (props:any) => {
  const [qty,setqty]=useState(0)
  const [isrefreshed,setisrefreshed]=useState(false)
  const baseurl=import.meta.env.VITE_Base_Api_URI
  const title= props.product.title.length>35?props.product.title.substring(0,35)+'....':props.product.title

  // useEffect(()=>{
  //   setadded(false)
  // },[added])
  const onclicked=async ()=>{
    setisrefreshed(true)
    const date=getdate()
    const cartid=getCookie('cartid')
    const userid=getCookie('userid')
    const postdata:any={
      userId:userid,
      date:date,
      products:[{productId:props.product.id,quantity:qty}]
    }
    const addcart= await axios.put(`${baseurl}/carts/${cartid}`,postdata)
    console.log(addcart)
  }
  const getcount=(count:any,refresh:any)=>{
    setqty(count)
    setisrefreshed(refresh)
  }
  return (
    <div className='bg-white h-[450px] text-black rounded-xl'>
      {/* <h1>{JSON.stringify(props.product)}</h1> */}
      <div className='flex items-center justify-center bg-white h-60 rounded-t-xl'>
        <Link to={`/product/${props.product.id}`}><img src={props.product.image} alt='' className='select-none h-44 w-44' draggable='false'/></Link>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <p className='flex font-serif text-xl font-bold justify-items-center'>{title}</p>
        <p className='flex text-lg font-semibold'>${props.product.price}</p>
        <div className='flex mb-10'>
            <Qty class='w-10 h-10' getcount={getcount} refresh={isrefreshed}/>
            <Button Click={onclicked}><FaCartPlus /></Button>
        </div>
      </div>
    </div> 
  )
}

export default Card

// {
//   "id":9,
//   "title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
//   "price":64,
//   "description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
//   "category":"electronics",
//   "image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//   "rating":{"rate":3.3,"count":203}
// }

{/* <MdCurrencyRupee/> */}
