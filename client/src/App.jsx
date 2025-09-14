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
export const serverUri = "http://localhost:8000"

const App = () => {
  
  getCurrentUser()
  GetSuggestedUser()
  getAllPost()
  getAllBitz()
  getAllDailiez()


  
  const {userData, profileData}=useSelector(state=>state.user)
  return (
    <Routes>
      <Route path="/signup" element={!userData?<SignUp />:<Navigate to={"/"}/>} />
      <Route path="/signin" element={!userData?<SignIn />:<Navigate to={"/"}/>} />
      <Route path="/" element={userData?<Home />:<SignIn/>} />
      <Route path="/forgotpassword" element={!userData?<ForgotPassword />:<Navigate to={"/"}/>} />
      <Route path='/profile/:userName' element={userData?<Profile/>:<Navigate to={"/signin"}/>}/>
      <Route path='/dailiez/:userName' element={userData?<Dailiez/>:<Navigate to={"/signin"}/>}/>
      <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={"/signin"}/>}/>
      <Route path='/upload' element={userData?<Upload/>:<Navigate to={"/signin"}/>}/>
      <Route path='/bitz' element={userData?<Bitz/>:<Navigate to={"/signin"}/>}/>
    </Routes>
  )
}

export default App