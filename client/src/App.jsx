import React, { useEffect } from 'react'
import axios from "axios"
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import GetSuggestedUser from './hooks/GetSuggestedUser'
import Profile from './pages/Profile'
import EditProfile from './pages/editProfile'
import Upload from './pages/Upload'
import getAllPost from './hooks/getAllPost'
import { setUserData } from './redux/userSlice'
import Bitz from './pages/Bitz'
import getAllBitz from './hooks/getAllBitz'
import Dailiez from './pages/Dailiez'
import getAllDailiez from './hooks/getAllDailiez'
import Message from './pages/Message'
import MessageArea from './pages/MessageArea'
import {io} from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/socketSlice.js'
import getFollowingList from './hooks/getFollowingList.jsx'
import getPrevChatUsers from './hooks/getPrevChatUsers.jsx'
export const serverUri = "http://localhost:8000"

const App = () => {

  getCurrentUser()
  GetSuggestedUser()
  getAllPost()
  getAllBitz()
  getAllDailiez()
  getFollowingList()
  getPrevChatUsers()



  const { userData, profileData } = useSelector(state => state.user)


  const { socket } = useSelector(state => state.socket)
  const dispatch = useDispatch()
  useEffect(() => {
    if (userData) {
      const socketIo = io(`${serverUri}`, {
        query: {
          userId: userData._id
        }
      })
      dispatch(setSocket(socketIo))


      socketIo.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users))
        console.log(users)
      })


      return () => socketIo.close()
    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [userData])


  // socket?.on("newNotification",(noti)=>{
  //   dispatch(setNotificationData([...notificationData,noti]))
  // })


  return (
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path="/" element={userData ? <Home /> : <SignIn />} />
      <Route path="/forgotpassword" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/profile/:userName' element={userData ? <Profile /> : <Navigate to={"/signin"} />} />
      <Route path='/dailiez/:userName' element={userData ? <Dailiez /> : <Navigate to={"/signin"} />} />
      <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signin"} />} />
      <Route path='/messages' element={userData ? <Message /> : <Navigate to={"/signin"} />} />
      <Route path='/messageArea' element={userData ? <MessageArea /> : <Navigate to={"/signin"} />} />
      <Route path='/upload' element={userData ? <Upload /> : <Navigate to={"/signin"} />} />
      <Route path='/bitz' element={userData ? <Bitz /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App