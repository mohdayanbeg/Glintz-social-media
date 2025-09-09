import React, { useRef, useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiPlusSquare } from "react-icons/fi";
import VideoPlayer from '../components/VideoPlayer.jsx';
import axios from 'axios';
import { serverUri } from '../App.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice.js';
import { setDailiezData } from '../redux/dailiezSlice.js';
import { setBitzData } from '../redux/bitzSlice.js';
import { ClipLoader } from 'react-spinners';





const Upload = () => {
    const dispatch=useDispatch()
    const mediaInput = useRef()
    const {postData}=useSelector(state=>state.post)
    const {bitzData}=useSelector(state=>state.bitz)
    const {dailiezData}=useSelector(state=>state.dailiez)
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const [mediaType, setMediaType] = useState("")
    const [caption, setCaption] = useState("")
    const [loading,setLoading]=useState(false)

    const handleMedia = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file.type.includes("image")) {
            setMediaType("image")
        } else {
            setMediaType("video")
        }
        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUri}/api/post/upload`, formData, { withCredentials: true })
               dispatch(setPostData([...postData,result.data]))
               setLoading(false)
               navigate("/")
            console.log(result);

        } catch (error) {
            console.log(error)
        }
    }

    const uploadDailiez = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUri}/api/dailiez/upload`, formData, { withCredentials: true })
               dispatch(setDailiezData(result.data))
                 setLoading(false)
               navigate("/")
            // console.log(result);

        } catch (error) {
            console.log(error)
        }
    }


    const uploadBitz = async () => {
         setLoading(true)
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUri}/api/bitz/upload`, formData, { withCredentials: true })
                 dispatch(setBitzData([...bitzData,result.data]))
                 setLoading(false)
               navigate("/")
            // console.log(result);

        } catch (error) {
            console.log(error)
        }
    }



    const handleUpload = () => {
         setLoading(true)
        if(uploadType=='post'){uploadPost()}
        else if(uploadType=='dailiez'){uploadDailiez()}else{uploadBitz()}
    }


    return (
        <div className='w-full h-[100vh] bg-black flex flex-col items-center '>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-[25px]  h-[25px] ' onClick={() => navigate(`/`)} />
                <h1 className='text-white text-[20px] font-semibold'>Upload Media</h1>
            </div>

            <div className='w-[90%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center gap-[10px]' >

                <div className={`${uploadType == "post" ? "bg-black text-white shadow-2xl shadow-black" : ""} text-black  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("post")}>Post</div>

                <div className={`${uploadType == "dailiez" ? "bg-black text-white shadow-2xl shadow-black" : ""}text-black  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("dailiez")}>Dailiez</div>

                <div className={`${uploadType == "bitz" ? "bg-black text-white shadow-2xl shadow-black" : ""}text-black  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("bitz")}>Bitz</div>

            </div>
            <input type="file" hidden ref={mediaInput} onChange={handleMedia} />
            {!frontendMedia && <div className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]' onClick={() => mediaInput.current.click()} ><FiPlusSquare className='text-white cursor-pointer w-[25px] h-[25px]' />
                <div className='text-white text-[19px] font-semibold'>Upload {uploadType}</div>
            </div>}


            {frontendMedia &&
                <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[15vh]'>

                    {mediaType == "image" &&
                        <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[5vh] '>
                            <img src={frontendMedia} alt="" className='h-[60%] rounded-2xl' />
                            {uploadType !== "dailiez" && <input type='text' className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e) => setCaption(e.target.value)} value={caption} />}

                        </div>}


                    {mediaType == "video" &&
                        <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[5vh] '>
                            <VideoPlayer media={frontendMedia} />
                            {uploadType !== "dailiez" && <input type='text' className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e) => setCaption(e.target.value)} value={caption} />}

                        </div>}





                </div>}

            {frontendMedia && <button className='px-[10px] w-[60%] max-w-[400px]   py-[5px] h-[50px] bg-[white] mt-[50px] cursor-pointer rounded-2xl text-black' onClick={handleUpload}>{loading?<ClipLoader size={30} color='black'/>:`upload ${uploadType}`}</button>}

        </div>
    )
}

export default Upload