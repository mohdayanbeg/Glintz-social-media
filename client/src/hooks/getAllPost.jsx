import React, { useEffect } from 'react'
import { serverUri } from '../App'
import { setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPostData } from '../redux/postSlice'

const getAllPost = () => {

const dispatch=useDispatch()
const {userData}=useSelector(state=>state.user)
const {postData}=useSelector(state=>state.post)

  useEffect(()=>{
    const fetchPost= async ()=>{
        try {
            const result= await axios.get(`${serverUri}/api/post/getall`,{withCredentials:true})
            dispatch(setPostData(result.data))


        } catch (error) {  
            console.log(error);
            
            
        }
    }
    fetchPost()
  },[dispatch, userData,postData])
}

export default getAllPost