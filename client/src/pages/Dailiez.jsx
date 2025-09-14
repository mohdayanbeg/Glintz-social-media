import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { serverUri } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setDailiezData } from '../redux/dailiezSlice.js'
import DailiezCard from '../components/DailiezCard.jsx'

const Dailiez = () => {

    const dispatch=useDispatch()
    const {dailiezData}=useSelector(state=>state.dailiez)

    const {userName}=useParams()
    const handleDaliez= async ()=>{
      dispatch(setDailiezData(null))
        try {
            const result = await axios.get(`${serverUri}/api/dailiez/getByUserName/${userName}`,{withCredentials:true})
            
            
            dispatch(setDailiezData(result.data[0]))
            
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(userName){
         handleDaliez()
         
        }

    },[userName])

  return (
    <div className='w-full  h-[100vh] bg-black flex justify-center items-center'>
        <DailiezCard dailiezData={dailiezData}/>
    </div>
  )
}

export default Dailiez