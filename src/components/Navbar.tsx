import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { GiAbstract013 } from "react-icons/gi";
import Button from './utils/Button';
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

const Links=[
    {name:"HOME",link:"/"},
    {name:"Cart",link:"/cart"},
    {name:"products",link:"/products"},
    {name:"Letsgo",link:"/"},
]

const Navbar = () => {
    const [open,setopen]=useState(false)
  return (
    <div className='fixed top-0 left-0 z-50 w-full shadow-md'>
        <div className='items-center justify-between py-4 bg-flipkart md:flex md:px-10 px-7'>
            <div className='text-2xl font-bold cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                <span className='pt-2 mr-1 text-3xl text-slate-600'>
                <GiAbstract013 />
                </span>
                <p className='pt-2 text-indigo-700'>
                    Designer
                </p>
            </div>
            <div onClick={()=>{setopen(!open)}} className='absolute text-3xl cursor-pointer right-8 top-5 md:hidden'>
                {open?<MdOutlineClose />:<MdMenu />}
            </div>
            <ul className={`absolute pb-12 bg-flipkart md:flex md:items-center md:pb-0 md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open?'top-20 opacity-100':'top-[-490px]'} md:opacity-100 `}>
                {Links.map((L:any)=>(
                    <li key={L.name} className='text-xl md:ml-8 md:my-0 my-7'>
                        <Link to={L.link} className='text-indigo-700 duration-300 hover:text-gray-400'>{L.name}</Link>
                    </li>
                )
                )}
                <div className='md:ml-8'>
                    <Button>Get started</Button>
                </div>
            </ul>
        </div>
    </div>
  )
}

export default Navbar