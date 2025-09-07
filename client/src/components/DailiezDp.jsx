import React from 'react'
import dp from "../assets/dp.png"
import { useSelector } from 'react-redux'
const DailiezDp = ({ProfileImage,userName}) => {

    let {userData}=useSelector(state=>state.user)

  return (
    <div className='flex flex-col w-[80px]'>
        <div className='w-[80px] h-[80px] bg-gradient-to-bl from-[#1e2fc7] via-[#7622f4] via-[#ff0066] to-[#ff8d03] rounded-full flex justify-center items-center'>
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img src={userData.profileImage || dp} alt="" className='w-full object-cover' />
          </div>
    </div>
    <div className='text-[14px] text-center truncate w-full text-white'>
        {userName}
    </div>
    </div>
  )
}

export default DailiezDp