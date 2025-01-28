import React from 'react'

export default function withAuth(Component) {
  return (props)=>{

const auth=localStorage.getItem('Auth')
console.log(auth)
if(!auth){
   return <h1>not authenticated</h1>
}
return (<Component/>)
  }
}
