/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiTwotoneHeart } from "react-icons/ai"
import {MdOutlineCollectionsBookmark,MdOutlineComment} from 'react-icons/md'
import { AuthContext } from "./AuthContext"
import { useContext, useState } from "react"
import axios from 'axios'
import {IoIosArrowDropdownCircle,IoIosSend} from 'react-icons/io'
import {BsPersonFillAdd} from 'react-icons/bs'
import CommentArea from "./CommentArea"
const Post = ({post}) => {
const {user} = useContext(AuthContext)

const [like,setLike] = useState({status : post.likes.includes(user.userId), noOfLikes:post.likes?.length})
const [caption,setCaption] = useState(false)
const [comment,setComment] = useState(false)
const [commentText,setCommentText] = useState({text:'',reload:false})

const handleComment = (e) =>{
    setCommentText({ ...commentText,text : e.target.value})
}

const addComment = () => {
        console.log(commentText)
        axios.post(
            `${import.meta.env.VITE_BASEURL}post/comment`,
            {
                postId:post._id,
                comment:commentText.text
            },
            { 
                headers:{"Authorization" : user.userAccessToken}
            }
        
        ).then((res)=>{
           setCommentText({text:'',reload:(!commentText.reload)})
        })
    
    
}

  
const likePost = async (userId,postId) =>{
    let action = like.status?'unlike':'like'

    try{
            if(user?.userAccessToken){
                    
            setLike(
                {   status:!like.status,
                    noOfLikes: action == 'like'? like.noOfLikes + 1 : like.noOfLikes - 1 
                })
                        
            await axios.put(`${import.meta.env.VITE_BASEURL}post/likepost/${action}`,
            {
                postId:postId
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

            setLike({status : post.likes.includes(user.userId), noOfLikes:post.likes?.length})
            console.log(error)
            
        }
  }

  return (
    <div className="relative  overflow-hidden w-full max-w-[500px] p-4 bg-white my-4 rounded-lg border-2 border-neutral-200">
        
        {/* comment */}

        {<div className={`absolute border-t-2 w-[100%] h-[70%] max-h-[300px] left-0 bg-[#fff] p-2 rounded-xl comment ${(comment?'comment-up':'comment-down')}`}>
            
            <div onClick={()=>{setComment(false)}} className="w-[42px] h-[32px] left-[50%] z-20 translate-x-[-50%] rounded-lg absolute bg-white  top-[-12px] border-2 flex  items-center justify-center p-1 mb-1 cursor-pointer"><IoIosArrowDropdownCircle size={20} color="#222" /></div>

            <div className='w-full flex rounded-md border-t-2 left-0 p-2 bg-white z-40 absolute bottom-[0%]'>
                <input onChange={(e)=>{handleComment(e)}}  value={commentText.text} className="p-1 px-2 rounded-md w-full border-2 outline-none" placeholder="input"/>
                <button onClick={()=>{addComment()}} className="bg-neutral-800 border-2 text-white px-4 p-1 ml-2 rounded-md "><IoIosSend size={20} color={"#fff"}/></button>
            </div>              
            
            <CommentArea commentText={commentText} postId={post._id} user={user} comment={comment} />
        
        </div>}

        {/* comment */}

        <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
            <img className="w-6 h-6 rounded-full" src='/vite.svg' />
            <h2 className="font-bold text-lg ml-2">{post.username}</h2>
        </div>
            <div className="bg-neutral-200 p-[0.4rem] rounded-full">
            <BsPersonFillAdd color="#222" size="18"/>
            </div>
        </div>

        <div className="w-full max-h-[400px] flex justify-center  rounded-lg bg-slate-200">
            <img className=" max-h-[400px] rounded-lg" src = {post.imageURL}/>
        </div>

        {/* caption */}
        <div onClick={()=>{setCaption(!caption)}} className={`mt-2 ml-1 max-h-[200px] overflow-y-scroll text-neutral-600 cursor-pointer`}> { caption ? post.title: (post.title.length < 50 ? post.title : post.title.slice(0,50)+'...')}</div>

        <div className="mt-2 flex items-center justify-between w-full">
            <div className="flex items-center">
                <div className="flex items-center">
                    <AiTwotoneHeart className="cursor-pointer" onClick={()=>{likePost(user.userId,post._id)}} size={24} color={like.status?"red":"#666"}/>
                    <h3 className="text-md  ml-2">
                        {like.noOfLikes}
                    </h3>
                </div>
            
            <MdOutlineComment onClick={()=>{setComment(true)}} className="ml-4 cursor-pointer" size={24} color="#666"/>
            </div>

            <div>
            <MdOutlineCollectionsBookmark className="ml-4 flex-end" size={24} color="#666"/>
            </div>
        </div>
    </div>
  )
}

export default Post