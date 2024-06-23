import React, { useEffect, useState } from 'react'
import Button from './Button'

const Qty = (props:any) => {
    const [count,setcount]=useState(0)
    const decrement=()=>{
        count===0?setcount(0):setcount(count-1)
    }
    const increment=()=>{
        count===100?setcount(100):setcount(count+1)
    }
    useEffect(()=>{
        props.getcount(count)
    },[count])
  return (
    <>
    <div className='flex justify-between mr-10'>
        <Button class='w-20 h-20' Click={decrement}>-</Button>
        <input placeholder={`${count}`} className='w-24 pl-12 '/>
        <Button class='w-20 h-20' Click={increment}>+</Button>
    </div>
    </>
  )
}

export default Qty