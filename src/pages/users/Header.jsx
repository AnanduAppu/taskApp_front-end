import React, { useContext } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserContex from "../../userContex/UserContex";
function Header() {
   const navigate = useNavigate()
    const { userData } = useContext(UserContex);

    const clearCookie = (cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      };

      const logOut = (e)=>{
        e.preventDefault()
        clearCookie('userToken')
        toast.success("you loged out")
        navigate('/')
      }

  return (
    <div className='flex justify-between w-[100] bg-yellow-300 border border-gray-100 shadow-lg h-14 p-2'>
        <div >
            <h1 className='text-2xl font-semibold'>Task App</h1>
        </div>
        <div className='px-3' >
           <span className='mx-2 font-semibold'>{userData.username}</span>

           <button onClick={(e)=>logOut(e)} className='py-1 px-2 border border-blue bg-yellow-100 rounded-lg hover:bg-red-300 duration-300 font-semibold'>log out</button>
        </div>
    </div>
  )
}

export default Header