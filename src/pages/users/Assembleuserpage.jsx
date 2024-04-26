import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


function Assembleuserpage() {
  return (
    <div>
        <Header/>
        <div className='mx-auto bg-gray-100 w-[100%] h-[100vh]'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Assembleuserpage