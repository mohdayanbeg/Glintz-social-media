import React from 'react'
import logo from '../assets/title.png'
import dp from '../assets/dp.png'
import { FaRegHeart } from "react-icons/fa";
import DailiezCard from './DailiezDp';
import Nav from './Nav';
import { useSelector } from 'react-redux';
import Post from './Post';


const Feed = () => {

  const {postData}=useSelector(state=>state.post)

  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
              <img src={logo} alt="" className='w-[100px]' />
              <div className="">
                <FaRegHeart className='w-[25px] h-[25px]' />
              </div>
            </div>


            <div className="flex w-full overflow-auto gap-[20px] items-center p-[10px]">
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              <DailiezCard userName={"userName"}/>
              
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