import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.png"
import { useNavigate } from 'react-router-dom'
import { MdOutlineComment } from "react-icons/md";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import VideoPlayer from './VideoPlayer'
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { GoBookmarkFill } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import axios from 'axios';
import { serverUri } from '../App';
import { setPostData } from '../redux/postSlice';
import { setUserData } from '../redux/userSlice';
import FollowButton from './FollowButton';
import getCurrentUser from '../hooks/getCurrentUser';
import { Socket } from 'socket.io-client';
const Post = ({ post }) => {

    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const { socket } = useSelector(state => state.socket)
    const { postData } = useSelector(state => state.post)
    const [showComment, setShowComment] = useState(false)
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()


    const handleLike = async () => {
        try {
            const result = await axios.get(`${serverUri}/api/post/like/${post._id}`, { withCredentials: true })
            const updatedPost = result.data
            const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
            dispatch(setPostData(updatedPosts))

        } catch (error) {

        }
    }


    const handleComment = async () => {
        try {
            const result = await axios.post(`${serverUri}/api/post/comment/${post._id}`, { message }, { withCredentials: true })
            const updatedPost = result.data
            const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
            dispatch(setPostData(updatedPosts))
            setMessage('')
        } catch (error) {

        }
    }


    const handleSaved = async () => {
        try {
            const result = await axios.get(`${serverUri}/api/post/saved/${post._id}`, { withCredentials: true })
            dispatch(setUserData(result.data))


        } catch (error) {
            console.log(error.response)
        }
    }


    useEffect(() => {
        socket?.on("likedPost", (updatedData) => {
            const updatedPosts = postData.map(p => p._id == updatedData.postId ? { ...p, likes: updatedData.likes } : p)
            dispatch(setPostData(updatedPosts))
        })
        socket?.on("commentedPost", (updatedData) => {
            const updatedPosts = postData.map(p => p._id == updatedData.postId ? { ...p, comments: updatedData.comments } : p)
            dispatch(setPostData(updatedPosts))
        })

        return () => {
            socket?.off("likedPost")
            socket?.off("commentedPost")
        }
    }, [socket, postData, dispatch])

    return (
        <div className='w-[90%] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-[20px]'>

            <div className='w-full h-[80px] flex justify-between items-center px-[10px]' >
                <div className='flex justify-center items-center md:gap-[20px] gap-[10px]' onClick={() => navigate(`/profile/${post.author?.userName}`)}>
                    <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                        <img src={post.author?.profileImage || dp} alt="" className='w-full object-cover' />
                    </div>

                    <div className="w-[150px] font-semibold truncate text-black">{post.author.userName}</div>

                </div>
                {userData._id != post.author._id && <FollowButton tailwind={"px-[10px] minw-[60px] md:min-w-[100px] py-[5px] h-[30px] md:h-[40px] bg-[black] text-white rounded-2xl text-[14px] md:text-[16px]"} targetUserId={post.author._id} />}
            </div>

            <div className='w-[90%]  flex  items-center justify-center'>
                {post.mediaType == "image" && <div className='w-[90%]flex  items-center justify-center '>
                    <img src={post.media} alt="" className='h-[60%] rounded-2xl' />
                </div>}

                {post.mediaType == "video" && <div className='w-[80%] flex flex-col items-center justify-center'>
                    <VideoPlayer media={post.media} />

                </div>}




            </div>


            <div className='w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px] text-black'>
                <div className='flex justify-center items-center gap-[10px] '>
                    <div className='flex justify-center items-center gap-[5px]'>
                        {!post.likes.includes(userData._id) && <GoHeart className='w-[25px] cursor-pointer h-[25px]' onClick={handleLike} />}
                        {post.likes.includes(userData._id) && <GoHeartFill className='w-[25px] cursor-pointer h-[25px] text-red-600' onClick={handleLike} />}
                        <span >{post.likes.length}</span>
                    </div>
                    <div className='flex justify-center items-center gap-[5px]' onClick={() => setShowComment(prev => !prev)}>
                        <MdOutlineComment className='w-[25px] cursor-pointer h-[25px]' />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <div onClick={handleSaved}>
                    {!userData.saved.includes(post?._id) ? (<GoBookmark className='w-[25px] cursor-pointer h-[25px]' />)
                        : (<GoBookmarkFill className='w-[25px] cursor-pointer h-[25px]' />)}
                </div>
            </div>

            {post.caption && <div className='w-full px-[20px] gap-[10px] flex justify-start items-center text-black'>
                <h1 className='font-semibold text-sm tracking-tight [word-spacing:-0.1rem]'>{post.author.userName}</h1>
                <div className='font-normal text-'>{post.caption}</div>
            </div>}


            {showComment &&
                <div className='w-full  flex flex-col gap-[30px] pb-[20px]'>
                    <div className='w-full h-[80px] flex items-center justify-between px-[20px] relative'>
                        <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                            <img src={post.author?.profileImage || dp} alt="" className='w-full object-cover' />
                        </div>
                        <input type="text" className='px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40px] text-black' placeholder='Write comment...' onChange={(e) => setMessage(e.target.value)} value={message} />
                        <button className='absolute right-[20px] cursor-pointer' onClick={handleComment}><IoSendSharp className='w-[25px] h-[25px] text-black' /></button>
                    </div>

                    <div className='w-full max-h-[300px] overflow-auto'>
                        {post.comments?.map((com, index) => (
                            <div key={index} className='w-full px-[20px] py-[20px]  flex items-center gap-[20px] border-b-2 border-b-gray-200'>
                                <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden text-black'>
                                    <img src={com.author.profileImage || dp} alt="" className='w-full object-cover' />
                                    {console.log(post.comments)
                                    }
                                </div>
                                <div className='text-black'>{com.message}</div>
                            </div>
                        ))}

                    </div>

                </div>
            }

        </div>







    )
}

export default Post