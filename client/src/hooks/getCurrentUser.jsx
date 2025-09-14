import React, { useEffect } from 'react'
import { serverUri } from '../App'
import { setFollowing, setUserData } from '../redux/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCurrentUserDailiez, setDailiezData } from '../redux/dailiezSlice.js'

const getCurrentUser = () => {
  const dispatch = useDispatch()
  const { userData, profileData } = useSelector(state => state.user)
  const { dailiezData, allDailiezList } = useSelector(state=>state.dailiez)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUri}/api/user/current`, { withCredentials: true })


        dispatch(setUserData(result.data))
        dispatch(setFollowing(result.data.following))
        dispatch(setCurrentUserDailiez(result.data.dailiez))



      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));

      }
    }
    fetchUser()
  }, [dailiezData])
}

export default getCurrentUser