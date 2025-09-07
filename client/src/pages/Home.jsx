import React from 'react'
import LeftHome from '../components/LeftHome'
import RightHome from '../components/RightHome'
import Feed from '../components/Feed'

const Home = () => {
  return (
    <div className="w-full flex justify-center items-start bg-gradient-to-t from-gray-950 to-[#012344]">
        <LeftHome/>
        <Feed/>
        <RightHome/>
    </div>
  )
}

export default Home