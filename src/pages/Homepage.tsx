import React from 'react'
import {NavLink,Outlet} from 'react-router-dom'

const Homepage = () => {
    const products=[1,2,3,4,5];
  return (
    <div className='flex gap-2'>
    <div className='flex flex-col gap-2'>
        {products.map((product)=>
        <NavLink key={product} to={`/product/${product}`} 
        className={({isActive})=>{
            return isActive ? 'text-primary-700':''
        }}>
        product {product}    
        </NavLink>
        )}
    </div>
    <Outlet/>
    </div>
  )
}

export default Homepage