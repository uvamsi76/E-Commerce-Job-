import React from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import Button from './utils/Button';
import { FaCartPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const onclicked=()=>{
  console.log('added to cart')
}

const Card = (props:any) => {
  return (
    <div className='bg-white h-[450px] text-black rounded-xl'>
      {/* <h1>{JSON.stringify(props.product)}</h1> */}
      <div className='flex items-center justify-center bg-white h-60 rounded-t-xl'>
        <Link to={`/product/${props.product.id}`}><img src={props.product.image} alt='' className='select-none h-44 w-44' draggable='false'/></Link>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <p className='flex font-serif text-xl font-bold justify-items-center'>{props.product.title}</p>
        <p className='flex text-lg font-semibold'>${props.product.price}</p>
        <Button Click={onclicked}><FaCartPlus /></Button>
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
