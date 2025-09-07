import React from 'react'
import { serverUri } from '../App'
import { setSuggestedUsers, setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'

const GetSuggestedUser = () => {
  
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)

  useEffect(()=>{
    const fetchUser= async ()=>{
        try {
            const result= await axios.get(`${serverUri}/api/user/suggested`,{withCredentials:true})
            dispatch(setSuggestedUsers(result.data))


        } catch (error) {  
            console.log(error)            
        }
    }
    fetchUser()
  },[userData])
}

export default GetSuggestedUser