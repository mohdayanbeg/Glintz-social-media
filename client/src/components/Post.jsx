import React from 'react'
import dp from "../assets/dp.png"
import { useNavigate } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
const Post = ({ postData }) => {

    const navigate = useNavigate()

    return (
        <div className='w-[90%]  min-h-[450px]  flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-[20px]'>

            <div className='w-full h-[80px] flex justify-between items-center px-[10px]' >
                <div className='flex justify-center items-center md:gap-[20px] gap-[10px]' onClick={() => navigate(`/profile/${postData.author?.userName}`)}>
                    <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                        <img src={postData.author?.profileImage || dp} alt="" className='w-full object-cover' />
                    </div>

                    <div className="w-[150px] font-semibold truncate text-black">{postData.author.userName}</div>

                </div>

                <button className="px-[10px] minw-[60px] md:min-w-[100px] py-[5px] h-[30px] md:h-[40px] bg-[black] text-white rounded-2xl text-[14px] md:text-[16px]">Follow</button>
            </div>

            <div className='w-[90%]  flex  items-center justify-center'>
                {postData.mediaType == "image" && <div className='w-[90%]flex  items-center justify-center '>
                    <img src={postData.media} alt="" className='h-[60%] rounded-2xl' />
                </div>}

                {postData.mediaType == "video" && <div className='w-[80%] flex flex-col items-center justify-center'>
                    <VideoPlayer media={postData.media} />

                </div>}




            </div>


        </div>
    )
}

export default Post