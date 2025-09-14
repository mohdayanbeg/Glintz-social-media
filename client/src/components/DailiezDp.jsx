import React from 'react'
import dp from "../assets/dp.png"
import { FiPlusCircle } from "react-icons/fi";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaHandLizard } from 'react-icons/fa';
const DailiezDp = ({ ProfileImage, userName, dailiez }) => {
  const navigate=useNavigate()
  let { userData } = useSelector(state => state.user)



  const handleClick=()=>{
  if(dailiez=='' && userName=="Your Dailiez"){
    navigate("/upload")
  }else if(dailiez!='' && userName=="Your Dailiez"){
      // handleViewers()
    navigate(`/dailiez/${userData?.userName}`)
 
  }else {
    //  handleViewers()
navigate(`/dailiez/${userName}`)
  }
}




  return (
    <div className='flex flex-col w-[80px] ' onClick={handleClick}>
      <div className={`w-[80px] h-[80px] ${dailiez!=''?"bg-gradient-to-bl from-[#001aff] via-[#f700ff] to-[#ff418d]":""} rounded-full flex justify-center items-center relative`}>
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img src={ProfileImage || dp} alt="" className='w-full object-cover' />
          {dailiez=='' && userName =="Your Dailiez" && <div>
            <FiPlusCircle className='absolute bottom-[8px] bg-black text-white right-[10px] rounded-full w-[22px] h-[22px]' />
          </div>}
        </div>
      </div>
      <div className='text-[14px] text-center truncate w-full text-white'>
        {userName}
      </div>
    </div>
  )
}

export default DailiezDp