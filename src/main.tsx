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
},


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
