/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {createContext} from 'react'
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios';
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({children}) => {

    const [user,setUser] = useState(null)
 
    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
  )
}
export default AuthContextProvider