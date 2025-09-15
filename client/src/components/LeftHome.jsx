import React, { useState } from 'react'
import logo from '../assets/title.png'
import dp from '../assets/dp.png'
import { FaRegHeart } from "react-icons/fa";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { serverUri } from '../App';
import { setUserData } from '../redux/userSlice';
import OtherUser from './OtherUser';



const LeftHome = () => {

  const [profilePic, setProfilePic] = useState(dp)

  const { userData,suggestedUsers } = useSelector(state => state.user)

  const dispatch = useDispatch()
  
  const handleLogout= async ()=>{
      try {
        const result=axios.get(`${serverUri}/api/auth/signout`,{withCredentials:true})
        dispatch(setUserData(null))
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-900">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img src={logo} alt="" className='w-[100px]' />
        <div className="">
          <FaRegHeart className='w-[25px] h-[25px]' />
        </div>
      </div>

      <div className="flex items-center gap-[10px] justify-between px-[10px] border-b-2 border-gray-900 py-[10px]">
        <div className='flex items-center gap-[10px]'>
          <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img src={userData.profileImage || profilePic} alt="" className='w-full object-cover' />
          </div>

          <div className="">
            <div className="text-[18px] text-white font-semibold">
              {userData.userName}
            </div>
            <div className="text-[15px] text-gray-400 font-semibold">{userData.name}</div>
          </div>
        </div>
        <div className="text-blue-500 font-semibold cursor-pointer" onClick={handleLogout}>Logout</div>

      </div>

    

    <div className='w-full flex flex-col gap-[20px] p-[20px]'>
      <h1 className="text-[white] text-[19px]">Suggested Users</h1>
      <div className="">
       {suggestedUsers && suggestedUsers.slice(0,10).map((user,index)=>(
        <OtherUser key={index} user={user}/>
    ))}
      </div>
    </div>


    </div>
  )
}

export default LeftHome