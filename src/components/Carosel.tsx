import  { useState } from 'react'
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
const slides = [
  {
    url: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    url: 'https://images.unsplash.com/photo-1587071292164-aa5ab1c8c706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    url: 'https://images.unsplash.com/photo-1616353071588-708dcff912e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    url: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const Carosel = () => {
  const [currentindex,setcurrentindex]=useState(0)

  const prevslide=()=>{
    const isfirstslide=currentindex===0;
    const newindex=isfirstslide?slides.length-1 : currentindex -1
    setcurrentindex(newindex)
  }

  const nextslide=()=>{
    const islastslide=currentindex===slides.length-1;
    const newindex=islastslide?0 : currentindex + 1
    setcurrentindex(newindex)
  }
  return (
    <>
    <div className='flex justify-center items-center h-[80%] w-[80%] relative z-0 group'>
      <div style={{backgroundImage:`url(${slides[currentindex].url})`}} className='w-full h-full duration-500 bg-center bg-no-repeat bg-cover bg-slate-50 rounded-2xl'>
        {/* left arrow */}
        <div className='hidden group-hover:block absolute top-[50%]  left-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevslide} size={30}/>
        </div>
        {/* right arrow */}
        <div className='hidden group-hover:block absolute top-[50%]  right-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextslide} size={30}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Carosel


// bg-contain style={{backgroundImage:`url(${slides[1].url})`}}