/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState} from 'react'
import {AiTwotoneHeart} from 'react-icons/ai'

const Comment = ({content}) =>{
    const [like,setLike] = useState(true)

    return <div className='p-2 mb-2 rounded-lg bg-white border-2'>
                <div className='flex justify-between items-center'>
                    <div className='font-bold'>User</div>
                    <div className='font-bold flex items-center'>
                        <div>200</div>
                        <AiTwotoneHeart  className="ml-2 cursor-pointer" size={18} color={like?"red":"#666"}/>
                    </div>
                </div>
                    
                    <div className='bg-red'>
                        {console.log(content)} 
                        {content.comment}     
                    </div>
                </div>
}

export default Comment