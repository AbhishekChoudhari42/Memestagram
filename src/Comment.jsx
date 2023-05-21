/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState,useContext} from 'react'
import {AiTwotoneHeart} from 'react-icons/ai'
import { AuthContext } from "./AuthContext"
import axios from 'axios'

const Comment = ({comment}) =>{
    const {user} = useContext(AuthContext)

    const [like,setLike] = useState({status : comment.likes.includes(user.userId), noOfLikes:comment.likes?.length})

    const likeComment = async () =>{
        let action = like.status?'unlike':'like'
    
        try{
                if(user?.userAccessToken){
                        
                setLike(
                    {   status:!like.status,
                        noOfLikes: action === 'like'? like.noOfLikes + 1 : like.noOfLikes - 1 
                    })
                            
                await axios.put(`${import.meta.env.VITE_BASEURL}post/likecomment/${action}`,
                {
                    commentId : comment._id
                },
                { 
                    headers:{"Authorization" : user.userAccessToken}
                }
                )
                .then((response)=>{    
                    setLike({status:!like.status,noOfLikes:response.data.likes})
                })
                }            
            }
            catch(error){
    
                setLike({status : comment.likes.includes(user.userId), noOfLikes:comment.likes?.length})
                console.log(error)
                
            }
      }

    return <div className='p-2 mb-2 rounded-lg bg-white border-2'>
                <div className='flex justify-between items-center'>
                    <div className='font-bold'>{comment.username}</div>
                    <div className="flex items-center">
                    <h3 className="text-md text-sm  mr-2">
                        {like.noOfLikes}
                    </h3>
                    
                    <AiTwotoneHeart className="cursor-pointer" onClick={()=>{likeComment()}} size={16} color={like.status?"red":"#666"}/>

                </div>
                </div>
                    
                    <div className='bg-red'>
                        {console.log(comment)} 
                        {comment.comment}     
                    </div>
                </div>
}

export default Comment