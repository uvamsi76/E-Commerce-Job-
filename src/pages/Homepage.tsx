import React from 'react'
import {Link} from 'react-router-dom'

const Homepage = () => {
    const products=[1,2,3,4,5];
  return (
    <div>
        {products.map((product)=>
        <Link key={product} to={`/product/${product}`}>
        <h1>product {product}</h1>    
        </Link>
        )}
    </div>
  )
}

export default Homepage