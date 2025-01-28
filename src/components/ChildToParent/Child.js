import React, { useState } from 'react'


export default function Child({value}) {

   
  return (
    <div>
    <button onClick={()=>{value('sajna')}}>Click me!</button>
    </div>
  )
}
