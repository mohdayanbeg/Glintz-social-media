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

const SignUp = () => {
    const [profileImage, setProfileImage] = useState(dp);
    const[showPassword,setShowPassword]=useState(false)

    const[name,setName]=useState("")
    const[userName,setUserName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState("")

    const navigate=useNavigate()

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file && file.type.startsWith('image/')) {
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             setProfileImage(event.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    
    const handleSignUp=async (e)=>{
        setLoading(true);
        try {
            e.preventDefault()
            const result=await axios.post(`${serverUri}/api/auth/signup`,{name,userName,email,password},{withCredentials:true})
            setLoading(false)
            console.log(result.data);
            
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
                    {/* <div className="flex justify-center mt-4">
                        <label htmlFor="dp-upload" className="cursor-pointer">
                            <div
                                className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300"
                            >
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-center text-xs">Upload Photo</span>
                                </div>
                            </div>
                        </label>
                        <input
                            id="dp-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div> */}

                    
                    <div className="space-y-4 w-full">
                        <input
                            value={name}
                            onChange={(e)=>{
                                setName(e.target.value)
                            }}
                            type="text"
                            placeholder="Full Name"
                            className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        />
                        <input
                            value={userName}
                            onChange={(e)=>{
                                setUserName(e.target.value)
                            }}
                            type="text"
                            placeholder="Username"
                            className="w-full text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        />
                        <input
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                            type="email"
                            placeholder="Email Address"
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

                        
                    </div>
                    <div>
                        <button
                        onClick={(e)=>{
                            handleSignUp(e)
                        }}
                        disabled={loading}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {loading?<ClipLoader size={20} color='black'/>:"Create Account"}
                    </button>
                    <p className='text-sm font-semibold text-gray-800 py-4'>Already have an account? <span className='border-b-1 text-blue-700 cursor-pointer' onClick={()=>{
                        navigate("/signin")
                    }}>Sign in</span></p>
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

export default SignUp;