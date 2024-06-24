import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/utils/Button'
import axios from 'axios'
import { getdate } from '../utils/getdate'
import { setCookie } from '../utils/cookie'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Signup = () => {
    const navigate=useNavigate()
    const [email,setemail]=useState('')
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [city,setcity]=useState('')
    const [street,setstreet]=useState('')
    const [number,setnumber]=useState('')
    const [zipcode,setzipcode]=useState('')
    const [lat,setlat]=useState('')
    const [long,setlong]=useState('')
    const [phone,setphone]=useState('')
    const [isloading,setisloading]=useState(false)
    const baseurl=import.meta.env.VITE_Base_Api_URI
    const submitted=async (e:any)=>{
        setisloading(true)
        e.preventDefault();
        const postdata={
            email:email,
            username:username,
            password:password,
            name:{
                firstname:firstname,
                lastname:lastname
            },
            address:{
                city:city,
                street:street,
                number:number,
                zipcode:zipcode,
                geolocation:{
                    lat:lat,
                    long:long
                }
            },
            phone:phone
        }
        const auth=await axios.post(`${baseurl}/users`,postdata)
        console.log(auth)
        alert('user has been signed up')
        setisloading(false)
        navigate('/')
        
    }
    if(isloading){
        return (
        <div className='flex items-center justify-center mt-96'>
            <Spinner/>
        </div>)
    }
  return (
    <div className='h-screen overflow-y-scroll no-scrollbar'>
        <Navbar/>
        <div className='flex flex-col items-center justify-center mt-[45%] md:mt-[10%]'>
            <h1 className='mb-16 font-serif text-5xl font-semibold text-indigo-500 '>
                Signup to create an account
            </h1>
            <form className='flex flex-col items-center justify-center w-full md:w-[40%] h-auto p-20 border shadow-2xl' onSubmit={submitted}>
                <div className='w-[80%] mt-5 border hover:shadow-xl hover:duration-500'>
                    <input className='w-full p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setemail(e.target.value)} placeholder='email'/>
                </div>
                <div className='mt-10 w-[80%] border hover:shadow-xl hover:duration-500'>
                    <input className='w-full p-5 text-gray-700 focus:outline-none focus:shadow-2xl' onChange={(e:any)=>setusername(e.target.value)} placeholder='username'/>
                </div>
                <div className='mt-10 w-[80%] border hover:shadow-xl hover:duration-500'>
                    <input className='w-full p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setpassword(e.target.value)} type='password' placeholder='password'/>
                </div>
                <div className='mt-10 w-[80%] border hover:shadow-xl hover:duration-500'>
                    <input className='w-full p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setphone(e.target.value)} placeholder='phone'/>
                </div>
                <div className='md:flex'>
                    <div className='mt-10 ml-5 mr-5 border md:w-auto hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setfirstname(e.target.value)} placeholder='firstname'/>
                    </div>
                    <div className='mt-10 ml-5 mr-5 border hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setlastname(e.target.value)} placeholder='lastname'/>
                    </div>
                </div>
                <div className='md:flex'>
                    <div className='mt-10 ml-5 mr-5 border hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setcity(e.target.value)} placeholder='city'/>
                    </div>
                    <div className='mt-10 ml-5 mr-5 border hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setstreet(e.target.value)} placeholder='street'/>
                    </div>
                </div>
                <div className='md:flex'>
                    <div className='mt-10 ml-5 mr-5 border hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setnumber(e.target.value)} placeholder='street number'/>
                    </div>
                    <div className='mt-10 ml-5 mr-5 border hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setzipcode(e.target.value)} placeholder='zipcode'/>
                    </div>
                </div>
                <div className='md:flex'>
                    <div className='mt-10 ml-5 mr-5 border hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setlat(e.target.value)} placeholder='lat'/>
                    </div>
                    <div className='mt-10 ml-5 mr-5 border hover:shadow-xl hover:duration-500'>
                        <input className='p-5 text-gray-700 focus:outline-none focus:shadow-2xl'  onChange={(e:any)=>setlong(e.target.value)} placeholder='long'/>
                    </div>
                </div>
              <div>
              <button type='submit' className='mt-20 bg-indigo-800 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400 duration-500`'>Submit</button>
                </div>  
            </form>
        </div>
        </div>
  )
}

export default Signup

