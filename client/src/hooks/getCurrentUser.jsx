import React, { useEffect } from 'react'
import { serverUri } from '../App'
import { setFollowing, setUserData } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const getCurrentUser = () => {

const dispatch=useDispatch()

  useEffect(()=>{
    const fetchUser= async ()=>{
        try {
            const result= await axios.get(`${serverUri}/api/user/current`,{withCredentials:true})
            dispatch(setUserData(result.data))
            dispatch(setFollowing(result.data.following))


        } catch (error) {  
            console.log(error);
            
            
        }
    }
    fetchUser()
  },[])
}

export default getCurrentUser