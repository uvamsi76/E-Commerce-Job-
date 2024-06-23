import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'

const PagenotFound = () => {
  return (
    <div>
        <Navbar/>
        <h1>OOOPSS!!!! PagenotFound</h1>
        <Link to='/'>Home</Link>
    </div>
  )
}

export default PagenotFound