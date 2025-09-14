import React, { useState, useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoPlayer from './VideoPlayer';

const DailiezCard = ({ dailiezData }) => {
  console.log(dailiezData);
  const {userData}=useSelector(state=>state.user)
  const navigate = useNavigate()
  // const {dailiezData} = useSelector(state=>state.dailiez)
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          navigate("/")
          return 100
        }
        return prev + 1
      })
    }, 150)

    return () => clearInterval(interval)
  }, [navigate])



  return (

    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center'>

      <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>
        <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-[25px]  h-[25px] ' onClick={() => navigate(`/`)} />
        <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' >
          <img src={dailiezData?.author?.profileImage || dp} alt="" className='w-full object-cover' />
        </div>
        <div className='w-[120px] font-semibold truncate text-white '>{dailiezData?.author?.userName}</div>
      </div>


      <div className='absolute top-[10px]  w-full h-[5px] bg-gray-900'>
        <div className='h-full w-[200px] bg-white transition-all duration-200 ease-linear' style={{ width: `${progress}%` }}>
        </div>
      </div>



      <div className='w-[full] h-[90vh]  flex  items-center justify-center '>
        {dailiezData?.mediaType == "image" && <div className='w-[90%]    flex  items-center justify-center   '>
          <img src={dailiezData?.media} alt="" className='w-[80%] rounded-2xl  object-cover' />
        </div>}

        {dailiezData?.mediaType == "video" && <div className='w-[80%]    flex flex-col items-center justify-center   '>
          <VideoPlayer media={dailiezData?.media} />
        </div>}
      </div>






      {dailiezData?.author?.userName == userData?.userName && <div className='absolute w-full flex items-center gap-[10px] text-white h-[70px] bottom-0 p-2 left-0 cursor-pointer ' onClick={() => setShowViewers(true)}>
        <div className='text-white flex items-center gap-[5px]'><FaEye />{storyData.viewers.length}</div>
        <div className='flex relative'>

          {storyData?.viewers?.slice(0, 3).map((viewer, index) => (


            <div className={`w-[30px] h-[30px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 10}px]` : ""}`}>
              <img src={viewer?.profileImage || dp} alt="" className='w-full object-cover' />
            </div>
          ))}

        </div>

      </div>}








    </div>


  )
}

export default DailiezCard