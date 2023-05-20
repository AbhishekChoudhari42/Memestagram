// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
const Register = () => {
  const {user,setUser} = useContext(AuthContext);

  const [formState,setFormState] = useState()
    
  const handleChange = (e) =>{

    setFormState({...formState,[e.target.name]:e.target.value})
    console.log(formState)
  
}


  const handleRegister = async (e) =>{
    e.preventDefault()
    console.log(formState)


    await axios.post(`${import.meta.env.VITE_BASEURL}auth/login`,
    {
        email : formState.email,
        password : formState.password

    }).then(response=>{

        if(response.data){
            const userId = response.data.user.userId
            const userAccessToken = response.data.user.accessToken
            setUser({userId ,userAccessToken})
            console.log(response.data.user.userId)
        }
        
    })
    
  }
  return  <div className="bg-blue-500 pt-10 w-screen h-screen flex justify-center items-center">
                {user && <Navigate to='/feed'/>}
                <form className='w-[320px] p-4 bg-white rounded-lg'>
                    <h2 className='text-lg font-bold'>Register 🤖👀</h2>
                    
                    <div className='mt-6 relative w-[100%] h-10 bg-slate-200'>
                            <input required name="name" onChange={handleChange}  type="text"  className="absolute p-2 w-full text-sm text-gray-900 bg-white rounded-md border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-white peer" placeholder=" " />
                            <label className="absolute pointer-events-none text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Username</label>
                    </div>

                    <div className='mt-6 relative w-[100%] h-10 bg-slate-200'>
                            <input required name="email" onChange={handleChange}  type="email"  className="absolute p-2 w-full text-sm text-gray-900 bg-white rounded-md border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-white peer" placeholder=" " />
                            <label className="absolute pointer-events-none text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Email</label>
                    </div>
                    <div className='mt-6 mb-6 relative w-[100%] h-10 bg-slate-200'>
                            <input required name="password" onChange={handleChange}  type="password"  className="absolute p-2 w-full text-sm text-gray-900 bg-white rounded-md border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-white peer" placeholder=" " />
                            <label className="absolute pointer-events-none text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Password</label>
                    </div>

                    <Link className='text-blue-600 text-sm' to="/">Click here to login</Link>

                    <button onClick={handleRegister} className="w-full bg-black hover:bg-blue-600 text-white mt-4 p-2 rounded-md">Register</button>

                </form>
                    
    </div>
}

export default Register