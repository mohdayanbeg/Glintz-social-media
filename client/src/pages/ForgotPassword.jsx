import React, { useState } from 'react'
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
    const[step,setStep]=useState(3)
    const [email,setEmail]=useState("")
    const [otp,setOtp]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmNewPassword,setConfirmNewPassword]=useState("")
    const [loading,setLoading]=useState(false)

const handleReset=async (e)=>{
    e.preventDefault()
    console.log("hello");
    
}

  return (
     <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center p-4">

        {step==1 && <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col">

        <h2 className='text-black text-[30px] font-semibold'>Forgot Password</h2>
            <input
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                            type="email"
                            placeholder="Email Address"
                            className="w-[80%] text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 mt-[30px]"
                        />
                        <button
                        onClick={(e)=>{
                            handleReset(e)
                        }}
                        disabled={loading}
                        className="w-[48%] px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors mt-[30px]"
                    >
                        {loading?<ClipLoader size={20} color='black'/>:"Send OTP"}
                    </button>
        </div>}
        
        {step==2 &&<div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col">

        <h2 className='text-black text-[30px] font-semibold'>Forgot Password</h2>
            <input
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                            type="email"
                            placeholder="Email Address"
                            className="w-[80%] text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 mt-[30px]"
                        />
            <input
                            value={otp}
                            onChange={(e)=>{
                                setOtp(e.target.value)
                            }}
                            type="email"
                            placeholder="Enter OTP"
                            className="w-[80%] text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 mt-[30px]"
                        />
                        <button
                        onClick={(e)=>{
                            handleReset(e)
                        }}
                        disabled={loading}
                        className="w-[48%] px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors mt-[30px]"
                    >
                        {loading?<ClipLoader size={20} color='black'/>:"Submit"}
                    </button>
        </div>}


        {step==3 &&<div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col">

        <h2 className='text-black text-[30px] font-semibold'>Reset Password</h2>
            <input
                            value={newPassword}
                            onChange={(e)=>{
                                setNewPassword(e.target.value)
                            }}
                            type="password"
                            placeholder="Enter new password"
                            className="w-[80%] text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 mt-[30px]"
                        />
            <input
                            value={confirmNewPassword}
                            onChange={(e)=>{
                                setConfirmNewPassword(e.target.value)
                            }}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-[80%] text-black px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 mt-[30px]"
                        />
                        <button
                        onClick={(e)=>{
                            handleReset(e)
                        }}
                        disabled={loading}
                        className="w-[48%] px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors mt-[30px]"
                    >
                        {loading?<ClipLoader size={20} color='black'/>:"Reset Password"}
                    </button>
        </div>}

     </div>
  )
}

export default ForgotPassword