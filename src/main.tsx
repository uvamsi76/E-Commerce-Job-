import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Homepage from './pages/Homepage.tsx';
import Productpage from './pages/Productpage.tsx';
import PagenotFound from './pages/PagenotFound.tsx';
import "./index.css"
import Cartpage from './pages/Cartpage.tsx';
import Login from './pages/Login.tsx';
import Products from './pages/Products.tsx';
import Signup from './pages/Signup.tsx';

alert(`Please use this creds for testing purposes Thankyou

        {"username": "kevinryan",
        "password": "kev02937@",}`)
const router =createBrowserRouter([{
  path:'/',
  element:<Homepage/>,
  errorElement:<PagenotFound/>,
  children:[]
},
{
  path:'/product/:productid',
  element:<Productpage/>
},{
  path:'/cart',
  element:<Cartpage/>
},{
  path:'/login',
  element:<Login/>
},{
  path:'/products/:categoryid',
  element:<Products/>
},{
  path:'/signup',
  element:<Signup/>
},


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
