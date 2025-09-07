import React, { useState } from 'react';
import dp from '../assets/dp.png'; 
import GlintLogo from '../assets/favicon.png';
import GlintTitle from '../assets/title.png';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from 'axios';
import { serverUri } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const SignIn = () => {
    const [profileImage, setProfileImage] = useState(dp);
    const[showPassword,setShowPassword]=useState(false)

    const[userName,setUserName]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState("")

    const dispatch = useDispatch()

    const navigate=useNavigate()

    
    const handleSignIn=async (e)=>{
        setLoading(true);
        try {
            e.preventDefault()
            const result=await axios.post(`${serverUri}/api/auth/signin`,{userName,password},{withCredentials:true})
            console.log(result.data);
            
            dispatch(setUserData(result.data))
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            setLoading(false)
            
        }
    }


    return (
        <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center p-4">
            <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border border-gray-200 shadow-xl">
                {/* left panel */}
                <div className="w-full lg:w-[50%] h-full p-8 flex flex-col items-center justify-center space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Sign In to<img src={GlintTitle} alt="Glintz" className='h-[75px] inline-block filter invert' />
                    </h1>
                    <p className="text-sm text-gray-600">Join our community today.</p>
                    
                    <div className="space-y-4 w-full">
                        <input
                            value={userName}
                            onChange={(e)=>{
                                setUserName(e.target.value)
                            }}
                            type="text"
                            placeholder="Username"
                            className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        />
                        <div className="relative">
                          <input
                              value={password}
                              onChange={(e)=>{
                                setPassword(e.target.value)
                             }}
                              type={showPassword?"text":"password"}
                              placeholder="Password"
                              className="required text-black w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 pr-10"
                          />{showPassword?
                          (<IoIosEyeOff className='absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-black' onClick={(e)=>{setShowPassword(!showPassword)}}/>):(
                          <IoIosEye className='absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-black' onClick={(e)=>{setShowPassword(!showPassword)}}/>)}
                        </div>   
                    <div className='w-[100%] px-5 cursor-pointer text-blue-600' onClick={()=>{navigate("/forgotpassword")}}>forgot password?</div>
                    </div>
                    <div>
                        <button
                        onClick={(e)=>{
                            handleSignIn(e)
                        }}
                        disabled={loading}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {loading?<ClipLoader size={20} color='black'/>:"Sign In"}
                    </button>
                    <p className='text-sm font-semibold text-gray-800 py-4'>Don't have an account? <span className='border-b-1 text-blue-700 cursor-pointer' onClick={()=>{
                        navigate("/signup")
                    }}>Sign Up</span></p>
                    </div>
                </div>
                {/* right panel */}
                <div className="hidden lg:flex w-[50%] h-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex-col items-center justify-center p-8 text-white space-y-4">
                    <div className="flex justify-center items-center">
                        <img src={GlintLogo} alt="Glintz Logo" className="w-30 h-30 object-cover" />
                        <img src={GlintTitle} alt="Glintz" className="w-48 object-contain filter invert" /> 
                    </div>
                    <p className="text-center text-white text-lg font-light mt-4 px-4">
                        Welcome to Glintz! Connect with friends and the world around you. Share your life's moments in a brilliant new way.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;