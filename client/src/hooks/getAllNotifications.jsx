import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { serverUri } from '../App'
import { setNotificationData } from '../redux/userSlice.js'

function getAllNotifications() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
const fetchNotifications=async ()=>{
    try {
        const result=await axios.get(`${serverUri}/api/user/getAllNotifications`,{withCredentials:true})
         dispatch(setNotificationData(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchNotifications()
  },[dispatch,userData])
}

export default getAllNotifications
