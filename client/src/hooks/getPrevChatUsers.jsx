import React, { useEffect } from 'react'
import { serverUri } from '../App.jsx'
import { setFollowing, setUserData } from '../redux/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCurrentUserDailiez, setDailiezData } from '../redux/dailiezSlice.js'
import { setPrevChatUsers } from '../redux/messageSlice.js'

const getPrevChatUsers = () => {
  const dispatch = useDispatch()
  const {messages}=useSelector(state=>state.message)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUri}/api/message/prevChats`, { withCredentials: true })


        dispatch(setPrevChatUsers(result.data))



      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));

      }
    }
    fetchUser()
  }, [messages])
}

export default getPrevChatUsers