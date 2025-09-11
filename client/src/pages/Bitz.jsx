import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BitzCard from '../components/BItzCard';
// import BitzCard from '../components/BItzCard';

const Bitz = () => {
    const { bitzData } = useSelector(state => state.bitz)
    const navigate = useNavigate()

    return (
        <div className='w-screen h-screen bg-black overflow-hidden flex justify-center items-center '>
            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100]'>
                <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-[25px]  h-[25px] ' onClick={() => navigate(`/`)} />
                <h1 className='text-white text-[20px] font-semibold'>Bitz</h1>
            </div>
            <div className='h-[100vh] overflow-y-scroll snap-y     snap-mandatory scrollbar-hide'>
                
            {bitzData.map((bitz,index)=>(
                 <div className='h-screen snap-start'>
                    <BitzCard bitz={bitz} key={index}/>
                 </div>
                
            ))}
            


            </div>
        </div>
    )
}

export default Bitz