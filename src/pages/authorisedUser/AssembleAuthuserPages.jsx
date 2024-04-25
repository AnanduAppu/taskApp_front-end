import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideBar from './SideBar'

function AssembleAuthuserPages() {
  return (
    <div className=" bg-yellow-50 overflow-hidden max-h-screen h-[100vh] w-[100%]">
        <Header/>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

export default AssembleAuthuserPages