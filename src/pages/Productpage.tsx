import React from 'react'
import {useParams} from 'react-router-dom'

const Productpage = () => {
    const params=useParams();
  return (
    <div>
        <h1>{"Productpage "+params.productid}</h1>
    </div>
  )
}

export default Productpage