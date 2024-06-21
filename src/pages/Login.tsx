import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { setCookie } from '../utils/cookie'
const Login = () => {
    const [username,setusername]= useState('')
    const [password,setpassword]= useState('')
    const [userid,setuserid]=useState('')
    const baseurl=import.meta.env.VITE_Base_Api_URI
    
    const finduserid =async (username:any)=>{
        const data= await axios.get(`${baseurl}/users`)
        const users=await data.data
        users.map((user:any)=>{
            if(user.username==username){
                setuserid(user.id)
                return 
            }
        })

    }
    const Submit= async(e:any)=>{
        e.preventDefault();
        await finduserid(username)
        console.log('called')
        const postdata={
            username:username,
            password:password
        }
        const auth=await axios.post(`${baseurl}/auth/login`,postdata)
        console.log(auth.data)
        setCookie('token', auth.data.token, 7);
        setCookie('userid', userid, 7);
    }
  return (
    <div>
        <form onSubmit={Submit}>
        <input placeholder='username' onChange={(e:any)=>setusername(e.target.value)}/>
        <input placeholder='password' type='password' onChange={(e:any)=>setpassword(e.target.value)}/>
        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login