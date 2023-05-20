/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState,useContext, useReducer } from 'react'
import { MdCancel } from 'react-icons/md'
import { storage ,db } from './api/firebase'
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import {AuthContext} from './AuthContext'
import {GiCancel} from 'react-icons/gi'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import axios from 'axios';

const CreatePostModal = (props) => {

    const [image,setImage] = useState(null)
    const {user} = useContext(AuthContext)
    const postReducer = (state,action) =>{
      switch(action.type){
        case "postdata":
          return {...state,postData:{...state.postData,[action.name]:action.payload}}
        case "preview":
          return {...state,preview:action.preview}
        case "progress":
          return {...state,progress:action.progress}
        case "isUploading":
          return {...state,isUploading:action.isUploading}
      }
    }
    const initialState = {

      postData:{},
      preview:null,
      uploadProgress:0,
      isUploading:false
    
    }
    
    const [post,dispatch] =  useReducer(postReducer,initialState)
    

function handleCaption(e){
    dispatch({type:'postdata',name:'caption',payload:e.target.value})
}

function postImage(){
  
  upload()

}

function handleChange(e) {
    console.log(e.target.files);
    console.log(e.target.files[0])
    setImage(e.target.files[0]);
    dispatch({type:'preview',preview : URL.createObjectURL(e.target.files[0])});
}

const upload = () =>{

    const imageRef = ref(storage,`/userProfile/${image.name}`)
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on("state_changed",(snapshot)=>{
         
         dispatch({type:"isUploading",isUploading:true})
         const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
         dispatch({type:'progress',progress:progress})
    },
    (error)=>
    {
      console.log(error)
    },
    ()=>{

      getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
        
        console.log('File available at', downloadURL);
        dispatch({type:'postdata',name:'imageURL',payload:downloadURL})
        console.log(post.postData)
  

        try{

        await axios.post(`${import.meta.env.VITE_BASEURL}post/createpost`,
        
        {
            title:post.postData.caption,
            imageURL:downloadURL,
             
        },
        { headers:{"Authorization" : user.userAccessToken} }
        ).then(()=>{

         dispatch({type:"isUploading",isUploading:false})

         setTimeout(() => {
          props.setPostModal(false)
          props.setPostUploaded(!props.postUploaded)
         }, 1000);

        })
      
      }catch(error){
          
          console.log(error)
        
        }

      });

    }

    )

  }
  return (
    <div className='w-full  z-[100] h-screen bg-[#111b] fixed top-0 left-0 flex justify-center items-center' >
    <div className='absolute z-[200] max-h-[600px] min-w-[350px] p-4 rounded-md bg-black '>
    <GiCancel onClick={()=>{props.setPostModal(false)}} size={36}  className='absolute rounded-full bg-white top-[-18px] right-[-18px]' />
        
        <div className='w-[auto] h-[300px] relative flex items-center justify-center' >
            {image && post.preview && <MdCancel onClick={()=>{ setImage(null)}} className='bg-[#1118] p-1 m-2 rounded-md  absolute top-0 left-0' color='white' size={36}/>}
            {image && <img className='h-[300px] w-auto ' src={post.preview}/>}
            {post.isUploading && <AiOutlineLoading3Quarters className='absolute   animate-spin' size={36} color='#fff'/>}
        </div>

        <div className='w-full flex justify-center flex-col items-center' >
        <div className = {`h-2 w-[${Math.floor(post.uploadProgress)}%] bg-red-700`} ></div>
        { !image && <div className=' w-full max-w-[350px]'>
            <input name='image' onChange={handleChange} id='file' style={{display:'none'}}  type="file"></input>
            <div className='w-full rounded-md bg-blue-300 flex justify-center items-center'>
            
            <label htmlFor='file'  className='rounded-md w-full bg-neutral-100 text-black px-2 py-2'>select image</label>

            </div>
        </div>
        }
        <div className='mt-2 relative max-w-[350px] w-full h-10'>

            <input onChange={handleCaption}  name="caption"  type="text"  className="  absolute p-2 w-full text-sm text-gray-900 bg-neutral-100 rounded-md border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label className="rounded-md text-center absolute pointer-events-none text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-100  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Caption</label>

        </div>

        <input onClick={postImage} className=' max-w-[350px] mt-2 hover:rounded-3xl transiton-all duration-300 font-semibold p-1 cursor-pointer w-full hover:text-white hover:border-neutral-300 hover:border-2  border-2 border-transparent rounded-md bg-blue-600 text-red-50' type="button" value={'Upload'} />
        </div>
    </div>

        
    
    </div>
  )
}

export default CreatePostModal