import React, { useRef, useState, useEffect } from 'react'
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import dp from "../assets/dp.png"
import FollowButton from './FollowButton';
import { MdOutlineComment } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { setBitzData } from '../redux/bitzSlice';
import axios from 'axios';
import { serverUri } from '../App';
const BitzCard = ({ bitz }) => {

  const { bitzData } = useSelector(state => state.bitz)
  const { userData } = useSelector(state => state.user)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMute, setIsMute] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)
  const [showHeart, setShowHeart] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const commentRef=useRef()



    const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
    else {
      videoRef.current.play();
      setIsPlaying(true)
    }

  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      const percent = (video.currentTime / video.duration) * 100
      setProgress(percent)
    }
  }
  const handleLike = async () => {
    try {
      const result = await axios.get(`${serverUri}/api/bitz/like/${bitz._id}`, { withCredentials: true })
      const updatedBitz = result.data
      const updatedBitzs = bitzData.map(p => p._id == bitz._id ? updatedBitz : p)
      dispatch(setBitzData(updatedBitzs))

    } catch (error) {
      console.log(error);

    }
  }


  // const handleComment = async () => {
  //   try {
  //     const result = await axios.post(`${serverUri}/api/post/comment/${post._id}`, { message }, { withCredentials: true })
  //     const updatedPost = result.data
  //     const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
  //     dispatch(setPostData(updatedPosts))
  //     setMessage('')
  //   } catch (error) {

  //   }
  // }

  const handleLikeOnDoubleClick = () => {
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 6000)
    { !bitz.likes?.includes(userData._id) ? handleLike() : null }
  }


useEffect(()=>{
const handleClickOutside=(event)=>{
if(commentRef.current && !commentRef.current.contains(event.target) ){
    setShowComment(false)
}
}

if(showComment){
    document.addEventListener("mousedown",handleClickOutside)
}else{
    document.removeEventListener("mousedown",handleClickOutside)
}

},[showComment])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current
      if (entry.isIntersecting) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }, { threshold: 0.6 })
    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }

  }, [])




  return (
    <div className='w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800  relative overflow-hidden'>


      {showHeart && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation  z-50'>
          <GoHeartFill className='w-[100px] h-[100px] drop-shadow-2xl ' />
        </div>
      )}



      <div ref={commentRef} className={`absolute z-[200] bottom-0 w-full h-[500px] p-[10px]  rounded-t-4xl bg-[#0e1718] transform transition-transform duration-500 ease-in-out left-0 shadow-2xl shadow-black ${showComment?"translate-y-0":"translate-y-[100%]"}`}>
<h1 className='text-white text-[20px] text-center font-semibold'>Comments</h1>

<div className='w-full h-[350px] overflow-y-auto flex flex-col gap-[20px]'>

    {bitz.comments.length==0 && <div className='text-center text-white text-[20px] font-semibold mt-[50px]'>No Comments Yet</div>}

{bitz.comments?.map((com,index)=>(
<div className='w-full  flex flex-col gap-[5px] border-b-[1px] border-gray-800 justify-center pb-[10px] mt-[10px]'>
<div className='flex justify-start items-center md:gap-[20px] gap-[10px]'>
          <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
            <img src={com.author?.profileImage || dp} alt="" className='w-full object-cover' />
          </div>
          <div className='w-[150px] font-semibold text-white truncate'>{com.author?.userName}</div>
        </div>
        <div className='text-white pl-[60px]'>{com.message}</div>
</div>
))}
</div>
 <div className='w-full fixed bottom-0 h-[80px] flex items-center justify-between px-[20px] py-[20px] '>
          <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden '>
            <img src={bitz.author?.profileImage || dp} alt="" className='w-full object-cover ' />
          </div>
          <input type="text" className='px-[10px] border-b-2 border-b-gray-500 w-[90%] text-white placeholder:text-white outline-none h-[40px]' placeholder='Write comment...' onChange={(e)=>setMessage(e.target.value)} value={message}/>
          {message &&  <button className='absolute right-[20px] cursor-pointer' onClick={handleComment}><IoSendSharp className='w-[25px] h-[25px] text-white'/></button>}
         
          </div>
</div>





      <video ref={videoRef} loop autoPlay muted={isMute} src={bitz?.media} onTimeUpdate={handleTimeUpdate} onDoubleClick={handleLikeOnDoubleClick} className='w-full max-h-full' onClick={handleClick} />



      <div className='absolute top-[20px] z-[100] right-[20px] ' onClick={() => setIsMute(prev => !prev)}>
        {!isMute ? <FiVolume2 className='w-[20px] h-[20px] text-white font-semibold' /> : <FiVolumeX className='w-[20px] h-[20px] text-white font-semibold' />}
      </div>

      <div className='absolute bottom-0  w-full h-[5px] bg-gray-900'>
        <div className='h-full w-[200px] bg-white transition-all duration-200 ease-linear' style={{ width: `${progress}%` }}>
        </div>
      </div>



      <div className='w-full absolute h-[100px] bottom-[10px] p-[10px] flex flex-col gap-[10px]'>
        <div className='flex items-center gap-[5px]'>
          <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' >
            <img src={bitz.author?.profileImage || dp} alt="" className='w-full object-cover' />
          </div>
          <div className='w-[120px] font-semibold truncate text-white '>{bitz.author.userName}</div>

          <FollowButton targetUserId={bitz.author?._id} tailwind={"px-[10px] py-[5px] text-white border-2 text-[14px] rounded-2xl border-white"} />
        </div>
        <div className='text-white px-[10px]'>
          {bitz.caption}
        </div>

        <div className='absolute right-0 flex flex-col gap-[20px] text-white  bottom-[150px] justify-center px-[10px] '>
          <div className='flex flex-col items-center cursor-pointer'>
            <div onClick={handleLike}>
              {!bitz.likes.includes(userData._id) && <GoHeart className='w-[25px] cursor-pointer h-[25px]' />}
              {bitz.likes.includes(userData._id) && <GoHeartFill className='w-[25px] cursor-pointer h-[25px] text-red-600' />}
            </div>
            <div >{bitz.likes.length}</div>
          </div>
          <div className='flex flex-col items-center cursor-pointer' onClick={() => setShowComment(true)}>
            <div><MdOutlineComment className='w-[25px] cursor-pointer h-[25px]' /></div>
            <div>{bitz.comments.length}</div>
          </div>

        </div>
      </div>



    </div>



  )
}

export default BitzCard