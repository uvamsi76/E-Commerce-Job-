import  {  useState } from 'react'
import axios from 'axios'
import { setCookie } from '../utils/cookie'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { getdate } from '../utils/getdate'
import Spinner from '../components/Spinner'
import Errorpage from '../components/Errorpage'
const Login = () => {
    const navigate=useNavigate()
    const [username,setusername]= useState('')
    const [password,setpassword]= useState('')
    const [isloading,setisloading]=useState(false)
    const [error,seterror] = useState<any>()
    // const [userid,setuserid]=useState(0)
    // const [carts,setcarts]=useState<any>([])
    // const [isfetching,setisfetching]=useState(false)
    const baseurl=import.meta.env.VITE_Base_Api_URI
    
    // const finduserid =async (username:any)=>{
    //     const data= await axios.get(`${baseurl}/users`)
    //     const users=await data.data
    //     const a= await users.map((user:any)=>{
    //         if(user.username==username){
    //             setuserid(user.id)
    //         }
    //     })
    //     return Promise.all(a)

    // }
    // useEffect(()=>{
    //     const a= async()=> await finduserid(username)
    // },[isfetching])
    // const Submit= async(e:any)=>{
    //     e.preventDefault();
    //     // setisfetching(true)
    //     const a= await finduserid(username)
    //     // Promise.all(a)
    //     console.log('called')
    //     const postdata={
    //         username:username,
    //         password:password
    //     }
    //     // const cartid=await axios.get(`${baseurl}/carts/login`)
    //     const auth=await axios.post(`${baseurl}/auth/login`,postdata)
    //     console.log(auth.data)
    //     const newcart={
    //         userId:userid,
    //         date:getdate(),
    //         products:[]
    //     }
    //     const carts=await axios.post(`${baseurl}/carts/user/${userid}`,newcart)
    //     // setcarts(carts)
    //     console.log(carts.data)
    //     // const cats=15
    //     setCookie('token', auth.data.token, 1);
    //     setCookie('userid', userid, 1);
    //     // setCookie('carts', JSON.stringify(cats), 1);
    //     // await navigate('/')
    // }

    const Submit = async (e:any)=>{
        e.preventDefault();
        setisloading(true)
        let uid=0
        try{
        const postdata={
            username:username,
            password:password
        }
        const data= await axios.get(`${baseurl}/users`)
        const users=await data.data
        const a= await users.map((user:any)=>{
            console.log(user.username)
            if(user.username==username){
                uid=user.id
                console.log(user.id)
            }
        })
        console.log(uid)
        const newcart={
            userId:uid,
            date:getdate(),
            products:[]
        }
        Promise.all(a)
        const auth=await axios.post(`${baseurl}/auth/login`,postdata)
        console.log(auth.data.token)
        const carts=await axios.post(`${baseurl}/carts`,newcart)
        console.log(carts)
        setCookie('token', auth.data.token, 1);
        setCookie('userid', JSON.stringify(uid), 1);
        setCookie('cartid', carts.data.id, 1);
    }
    catch (e){
        seterror(e)
        alert(e)
    }
    finally{
        setisloading(false)
        navigate('/')
    }
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
        <div className='flex flex-col items-center justify-center mt-[45%] md:mt-[15%]'>
            <form className='flex flex-col items-center justify-center p-20 border shadow-2xl' onSubmit={Submit}>
                <input className='p-5 mt-0 border hover:shadow-xl hover:duration-500' placeholder='username' onChange={(e:any)=>setusername(e.target.value)}/>
                <input className='p-5 mt-10 border hover:shadow-xl hover:duration-500' placeholder='password' type='password' onChange={(e:any)=>setpassword(e.target.value)}/>
                <button type='submit' className='mt-10 bg-indigo-800 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400 duration-500`'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Login