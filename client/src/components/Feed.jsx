import React from 'react'
import logo from '../assets/title.png'
import dp from '../assets/dp.png'
import DailiezDp from './DailiezDp'
import { FaRegHeart } from "react-icons/fa";
import { BiMessageAltDetail } from "react-icons/bi";
import Nav from './Nav';
import { useSelector } from 'react-redux';
import Post from './Post';
import { useNavigate } from 'react-router-dom';


const Feed = () => {

  const {userData}=useSelector(state=>state.user)
  const {postData}=useSelector(state=>state.post)
  
const {notificationData}=useSelector(state=>state.user)
  const {allDailiezList,currentUserDailiez}=useSelector(state=>state.dailiez)
  const navigate=useNavigate()

  

  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
              <img src={logo} alt="" className='w-[100px]' />
              <div className="flex items-center gap-[10px]">
                <div className='relative' onClick={()=>navigate("/notifications")}>
                 <FaRegHeart className='text-[white] w-[25px] h-[25px]' />
                           {notificationData?.length > 0 && notificationData.some((noti) => noti.isRead === false) && (<div className='w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]'></div>)}
                </div>
                <BiMessageAltDetail className='text-[white] w-[25px] h-[25px]' onClick={()=>navigate("/messages")}/>
              </div>
            </div>


            <div className="flex w-full overflow-auto gap-[20px] items-center p-[10px]">
              <DailiezDp userName={"Your Dailiez"} ProfileImage={userData.profileImage||dp} dailiez={currentUserDailiez}/>


              {allDailiezList?.map((dailiez,idx)=>(
                <DailiezDp userName={dailiez.author.userName} ProfileImage={dailiez.author.profileImage||dp} dailiez={dailiez} key={idx}/>
              ))}




            </div>
      

          <div className="w-full relative min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px]  bg-white rounded-t-[60px] pb-120px]">

        <Nav/>

        {postData && postData.map((post,index)=>(
  <Post post={post} key={index}/>))}

          </div>


    </div>
  )
}

export default Feed