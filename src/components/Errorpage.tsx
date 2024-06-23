import React from 'react'

const Errorpage = (props:any) => {
  return (
    <div>{JSON.stringify(props.error)}</div>
  )
}

export default Errorpage