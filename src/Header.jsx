/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import {useState} from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router-dom'
const Header = (props) => {
  const [nav,setNav] = useState(false)
    const {user,setUser} = useContext(AuthContext)
  const handleLogout =()=>{
    console.log('logout')

    axios.get(`${import.meta.env.VITE_BASEURL}auth/logout`).then(res=>{
        if(res.data.success)setUser(null)
        return <Navigate to='/'/>
    }).then(()=>{
      localStorage.clear()

    })

    

  }
  return (
    // navbar
    <div className="absolute top-0 w-full px-4 py-2 bg-neutral-900 flex justify-between items-center transition-opacity ease-in duration-500 z-50">
        
        <h2 className="text-white text-lg font-bold">Memestagram <span className='text-blue-400' >.</span> </h2>
        
        {(user && nav) && <nav className="absolute right-4 text-white bg-neutral-900 top-16 flex flex-col rounded-md p-2">
            <div className='px-16 py-2 mb-2 text-center hover:bg-neutral-700 rounded-md text-md' >Feed</div>
            <div className='px-16 py-2 mb-2 text-center hover:bg-neutral-700 rounded-md text-md' >My Profile</div>
            <div className='px-16 py-2 mb-2 text-center hover:bg-neutral-700 rounded-md text-md' >Feed</div>
            <div onClick={handleLogout} className='px-16 py-2 mb-1 text-center hover:bg-red-700 text-md bg-red-500 rounded-md' >Logout</div>
        </nav>}

        {user && <div className='flex items-center'>
        <button onClick={()=>{props.setPostModal(!props.postModal)}} className='bg-blue-500 text-sm  mr-4 px-4 py-1 rounded-md text-white '>Create</button>
        
         <div id='menu' className={`menu ${nav?'close':''}`} onClick={()=>{setNav(!nav)}}>
            <span></span>
            <span></span>
            <span></span>
        </div>
      
      </div>}

  

    </div>
  )
}

export default Header