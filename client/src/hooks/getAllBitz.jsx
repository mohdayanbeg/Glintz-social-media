import React, { useEffect } from 'react'
import { serverUri } from '../App'
import { setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPostData } from '../redux/postSlice'
import { setBitzData } from '../redux/bitzSlice'

const getAllBitz = () => {

const dispatch=useDispatch()
const {userData}=useSelector(state=>state.user)
const {postData}=useSelector(state=>state.post)

  useEffect(()=>{
    const fetchBitz= async ()=>{
        try {
            const result= await axios.get(`${serverUri}/api/bitz/getall`,{withCredentials:true})
            dispatch(setBitzData(result.data))


        } catch (error) {  
            console.log(error);
            
            
        }
    }
    fetchBitz()
  },[dispatch, userData, postData])
}

export default getAllBitz