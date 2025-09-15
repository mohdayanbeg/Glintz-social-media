import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUri} from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'
import { setAllDailiezList } from '../redux/dailiezSlice'

function getAllDailiez() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
     const {dailiezData}=useSelector(state=>state.dailiez)
     const {allDailiezList}=useSelector(state=>state.dailiez)
  useEffect(()=>{
const fetchDailiez= async ()=>{
    try {
        const result=await axios.get(`${serverUri}/api/dailiez/getAll`,{withCredentials:true})
         dispatch(setAllDailiezList(result.data))
         
    } catch (error) {
        console.log(error)
    }
}
fetchDailiez()
  },[userData,dailiezData])
}

export default getAllDailiez
