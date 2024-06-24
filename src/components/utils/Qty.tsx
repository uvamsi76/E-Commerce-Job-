import  { useEffect, useState } from 'react'
import Button from './Button'

const Qty = (props:any) => {
    let ic=0
    ic=props.initialcount?props.initialcount:0
    const [count,setcount]=useState(ic)
    const [refresh,setrefresh]=useState(props.refresh)
    const decrement=()=>{
        count===0?setcount(0):setcount(count-1)
    }
    const increment=()=>{
        count===100?setcount(100):setcount(count+1)
    }
    
    useEffect(()=>{
        if(props.refresh) {
            setcount(0)
            setrefresh(!props.refresh)
        }
        props.getcount(count,refresh)
    },[count,refresh])
  return (
    <>
    <div className='flex justify-between mr-10'>
        <Button class={`${props.class}`} Click={decrement}>-</Button>
        <input placeholder={`${count}`} className='w-24 pl-12 '/>
        <Button class={`${props.class}`}  Click={increment}>+</Button>
    </div>
    </>
  )
}

export default Qty