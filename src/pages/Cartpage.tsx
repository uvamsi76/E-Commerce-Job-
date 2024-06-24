import  { useEffect,  useState } from 'react'
import axios from 'axios'
import { getCookie } from '../utils/cookie'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import Qty from '../components/utils/Qty'
import Button from '../components/utils/Button'
import { RiStarSFill } from 'react-icons/ri'

const Cartpage = () => {
    type prodtype={
        productId:number,
        quantity:number
    }
    const [city,setcity]=useState('')
    const [street,setstreet]=useState('')
    const [number,setnumber]=useState('')
    const [zipcode,setzipcode]=useState('')
    const [name,setname]=useState('')
    const [phone,setphone]=useState('')
    const [cart,setcart]=useState([])
    const [qty,setqty]=useState(0)
    const [isrefreshed,setisrefreshed]=useState(false)
    const [products,setproducts]=useState<any>([])
    const [isloading,setisloading]=useState(false)
    const [totalqty,settotalqty]=useState(0)
    const userid=getCookie('userid')
    const cartid=getCookie('cartid')
    const [pq,setpq]=useState(0)
    const [ppq,setppq]=useState<any>({})
    const baseurl=import.meta.env.VITE_Base_Api_URI
    
    const fetchusercart=async()=>{
        setisloading(true)
        const user=await axios.get(`${baseurl}/users/${userid}`)
        console.log(user)
        setcity(user.data.address.city)
        setstreet(user.data.address.street)
        setnumber(user.data.address.number)
        setzipcode(user.data.address.zipcode)
        setname(user.data.name.firstname)
        setphone(user.data.phone)
        const usercart=await axios.get(`${baseurl}/carts/7`)
        setcart(usercart.data)
        if(usercart.data){
        const prods=usercart.data.products
        // console.log(prods)
        let p:any=[]
        let z:any={}
        const a=prods.map(async (prod:prodtype)=>{
            const req=await axios.get(`${baseurl}/products/${prod.productId}`)
            const data=await req.data
            p=[...p,data]
            z[prod.productId]=prod.quantity
            settotalqty(totalqty+prod.quantity)
            setpq(pq+prod.quantity*data.price)
            console.log(prod)
        })
        await Promise.all(a)
        setproducts(p)
        setppq(z)
        console.log(ppq)
        } 
        setisloading(false)
    }
    useEffect(()=>{
        settotalqty(0)
        fetchusercart();
    },[])
    const getcount=(count:any,refresh:any)=>{
        setqty(count)
        setisrefreshed(refresh)
      }
    var content
    if (products) {
        content = products.map((product:any)=>(
        <div key={product.id}>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='mt-24'>
                    <img className='pl-14 h-[50%] w-auto' src={`${product.image}`}/>
                    <div className='flex justify-center m-5 mt-20'>
                        <Qty getcount={getcount} refresh={isrefreshed} initialcount={ppq[product.id]}/>
                    </div>
                </div>
                <div className='mt-20 mr-20'>
                    <p className='font-mono text-3xl font-bold'>{product.title}</p>
                    <div className='flex mt-10 ml-1 text-xl font-semibold'>
                        <p className='mt-1 ml-2 text-lg' >{product.rating.rate}</p> 
                        <div className='flex ml-10'><RiStarSFill/><RiStarSFill/><RiStarSFill/><RiStarSFill/><RiStarSFill/> </div>
                        <p className='mt-0 ml-2 text-lg'>({product.rating.count})</p>
                    </div>
                    <div className='mt-12 font-serif text-6xl font-semibold'>
                        $ {product.price}
                    </div>
                    <div className='mt-14'>
                        <div className='mb-5 text-2xl font-semibold'>
                            product description -
                        </div>
                        <div className='font-serif text-lg'>
                            {product.description}
                        </div>
                    </div>
                </div>
                {/* <h1>Product</h1>
                <h1>{JSON.stringify(product)}</h1> */}
            </div>
        </div>
        ))
      } else {
        content = <p>No products Found</p>;
      }
    if(isloading){
        return (
            <div className='flex items-center justify-center mt-96'>
                <Spinner/>
            </div>)
    }
    return (
    <div>
        <Navbar/>
        <div className='grid grid-cols-12 mt-40 ml-20 mr-20 shadow-xl'>
            <div className='col-span-12 m-10 md:col-span-8 '>
                <div className='grid grid-cols-12 p-10 shadow rounded-xl'>
                    <h1 className='flex items-center justify-center col-span-6 font-serif text-2xl font-bold'>Contact Details</h1>
                    <div className='flex flex-col items-center col-span-6 '>
                    <p className='font-serif text-xl font-semibold'>{name}</p>
                    <p className='font-mono text-lg'>{city}</p>
                    <p className='font-mono text-lg'>{street}</p>
                    <p className='font-mono text-lg'>{number}</p>
                    <p className='font-mono text-lg'>{zipcode}</p>
                    <p className='font-mono text-lg'>(+1){phone}</p>
                    </div>
                </div>
                <br/>
                <div>
                    {content}
                </div>
            </div>
            <div className='flex flex-col items-center col-span-12 pt-20 shadow-xl rounded-3xl md:col-span-4'>
                <div className='p-10 font-serif text-5xl font-bold underline text-pretty '>
                    price details
                </div>
                <div className='p-10 font-mono text-4xl font-semibold'>
                    Total Quantity : {totalqty}
                </div>
                <div className='flex p-10 font-mono text-4xl font-semibold'>
                    <div>Total Price :</div>
                    <div className='font-mono'>${Math.round(pq * 100) / 100}</div>
                </div>
                <div className='m-10'>
                    <Button class='w-72 h-24' >place order</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cartpage

// {
//     id:1,
//     email:'John@gmail.com',
//     username:'johnd',
//     password:'m38rmF$',
//     name:{
//         firstname:'John',
//         lastname:'Doe'
//     },
//     address:{
//         city:'kilcoole',
//         street:'7835 new road',
//         number:3,
//         zipcode:'12926-3874',
//         geolocation:{
//             lat:'-37.3159',
//             long:'81.1496'
//         }
//     },
//     phone:'1-570-236-7033'
// }