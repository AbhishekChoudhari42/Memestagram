/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import axios from 'axios'
import Post from './Post'




const Feed = (props) => {

    const [feed,setFeed] = useState(null)
    const {user} = useContext(AuthContext)
    
    const getPosts = async () =>{
        
        try{
            if(user?.userAccessToken){
            await axios.get(`${import.meta.env.VITE_BASEURL}post/allposts`,{ headers:{"Authorization" : user.userAccessToken} }).then(response=>{
            
                console.log(response.data.posts);
                setFeed(response.data.posts)

            })
            console.log('feed loaded')

            }            
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getPosts()    
    },[user,props.postUploaded])
    
  return <div className="w-full  h-screen flex justify-center border-x-2 border-neutral-200 overflow-y-scroll pb-2">
            {!user && <Navigate to="/"/>}
            <div className='p-4   bg-neutral-100 pb-8 pt-12 h-fit '>
                
                {!feed && <div className='w-full py-2 px-4 rounded-md text-red-900 bg-red-100'>You dont have any Posts ! 🙁 </div>}
                {
                    feed && feed.map((post,index)=>{
                        return <Post post={post} key = {index}/>                
                    })
                }
            
            </div>
        </div>  
  
}

export default Feed