/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"
import { AuthContext } from "./AuthContext"
import Feed from "./Feed"
import { useContext } from "react"
const Home = (props) => {

    const {user} = useContext(AuthContext)

    return (
        
        <div className="flex">
            {!user && <Navigate to='/'/>}
            <div className="w-0 h-screen bg-slate-50">

            </div>
            {user && <Feed postUploaded = {props.postUploaded}/>}
            <div className="w-0 h-screen bg-slate-50">

            </div>
        </div>
  )
}

export default Home