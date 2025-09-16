import React from 'react'
import dp from "../assets/dp.png"
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaHandLizard } from 'react-icons/fa';
import { serverUri } from '../App';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { setDailiezData } from '../redux/dailiezSlice';



const DailiezDp = ({ ProfileImage, userName, dailiez }) => {


  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { userData } = useSelector(state => state.user)
  const {dailiezData,allDailiezList}=useSelector(state=>state.dailiez)
  const [viewed,setViewed]=useState(false)



  useEffect(()=>{
  if(dailiez?.viewers?.some((viewer)=>
  viewer?._id?.toString()===userData._id.toString() || viewer?.toString()==userData._id.toString()
)){
  setViewed(true)
}else{
  setViewed(false)
}


},[dailiez,userData,dailiezData,allDailiezList])




  const handleViewers=async (dailiezId)=>{
  try {
    const result=await axios.get(`${serverUri}/api/dailiez/view/${dailiezId}`,{withCredentials:true})

    dispatch(setDailiezData(result.data))
    
  } catch (error) {
    console.log(error)
  }
}


  const handleClick= async ()=>{
  if(dailiez=='' && userName=="Your Dailiez"){
    navigate("/upload")
  }else if(dailiez!='' && userName=="Your Dailiez"){  
      if (dailiez[0] && dailiez[0]._id) {
            await handleViewers(dailiez[0]._id);
            navigate(`/dailiez/${userData?.userName}`);
        } else {
            console.error("Dailiez ID is not available.");
            // Optionally, handle this case by navigating or showing an error message
            navigate(`/dailiez/${userData?.userName}`);
        }
 
  }else {
    console.log(dailiez._id);
    
     handleViewers(dailiez._id)
navigate(`/dailiez/${userName}`)
  }
}




  return (
    <div className='flex flex-col w-[80px] ' onClick={handleClick}>
      <div className={`w-[80px] h-[80px] ${dailiez==''?'':!viewed?"bg-gradient-to-bl from-[#001aff] via-[#f700ff] to-[#ff418d]":"bg-gradient-to-r from-gray-500 to-black-800"} rounded-full flex justify-center items-center relative`}>
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