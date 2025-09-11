import React, { useEffect } from 'react'
import { serverUri } from '../App'
import { setFollowing, setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const getCurrentUser = () => {
let {userData, profileData} = useSelector(state=>state.user)
const dispatch=useDispatch()

  useEffect(()=>{
     const fetchUser= async ()=>{
        try {
            const result= await axios.get(`${serverUri}/api/user/current`,{withCredentials:true})
            
            
            dispatch(setUserData(result.data))
            dispatch(setFollowing(result.data.following))


        } catch (error) {  
            console.log(error);
            dispatch(setUserData(null));
            
        }
    }
    fetchUser()
  },[])
}

export default getCurrentUser