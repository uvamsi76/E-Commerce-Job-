import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Homepage from './pages/Homepage.tsx';
import Productpage from './pages/Productpage.tsx';
import PagenotFound from './pages/PagenotFound.tsx';
import "./index.css"


const router =createBrowserRouter([{
  path:'/',
  element:<Homepage/>,
  errorElement:<PagenotFound/>,
  children:[]
},
{
  path:'/product/:productid',
  element:<Productpage/>
}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
