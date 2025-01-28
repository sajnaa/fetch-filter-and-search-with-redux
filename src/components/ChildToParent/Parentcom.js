import React,{useState} from 'react'
import Child from './Child.js'

export default function Parentcom() {
    const [data,setData]=useState('')
    
        const handlesubmit=(datas)=>{
            setData(datas)
        }
  return (
    <div>
      <h1>{data}</h1>
       <Child value={handlesubmit}/>


       parent
    </div>
  )
}


