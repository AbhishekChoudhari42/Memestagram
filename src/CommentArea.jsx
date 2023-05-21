/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import Comment from './Comment'


const CommentArea = (props) =>{

    const [commentsData,setCommentsData]= useState(null)
    
    const getComments = async () =>{
       
        axios.get(
            `${import.meta.env.VITE_BASEURL}post/getcomments/${props.postId}`
            ,
            { 
                headers:{"Authorization" : props.user.userAccessToken}
            }
        
        ).then((res)=>{
           setCommentsData(res.data.comments)
        })
    
    }

    useEffect(()=>{
        if(props.comment == true){
            getComments()
        }
    },[props.comment,props.commentText.reload])

    

    if(commentsData){
        return <div className='relative pb-[200px] w-[100%] h-fit max-h-[300px] overflow-y-scroll'>
                
                {commentsData && commentsData.map((comment,index)=>{
                     return <Comment key={index} comment={comment} />
                })}
                    
              
              </div>
    }else{
        return <div>Add a comment</div>
    }

}

export default CommentArea