import React from 'react'

const Categories = (props:any) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2'>
        {props.categories.map((category:any)=>
            <div>{JSON.stringify(category)}</div>)
        }
    </div>
  )
}

export default Categories