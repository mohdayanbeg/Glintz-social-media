import React from 'react'
import { serverUri } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { setProfileData, setUserData } from '../redux/userSlice'
import dp from "../assets/dp.png"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import axios from "axios"
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'
import Post from '../components/Post.jsx'
import { setSelectedUser } from '../redux/messageSlice.js'

const Profile = () => {
    let { userName } = useParams()
    const dispatch = useDispatch()
    const { profileData, userData } = useSelector(state => state.user)
    const { postData } = useSelector(state => state.post)
    let navigate = useNavigate()
    const [postType, setPostType] = useState("allpost")

    const handleProfile = async () => {
        try {

            const result = await axios.get(`${serverUri}/api/user/getProfile/${userName}`, { withCredentials: true })
            dispatch(setProfileData(result.data))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleProfile()
    }, [userName, dispatch])

    const handleLogout = async () => {
        try {
            const result = axios.get(`${serverUri}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
            console.log('logout')
        } catch (error) {
            console.log(error);

        }
    }

    return (

        <div className="w-full min-h-screen bg-black">
            <div className="w-full h-[80px] flex justify-between items-center px-[30px] text-white">
                <div className="" onClick={() => { navigate("/") }}><MdOutlineKeyboardBackspace className='text-white cursor-pointer w-[25px]  h-[25px]' /></div>
                <div className="font-semibold text-[20px]">{profileData?.userName}</div>
                <div className="font-semibold cursor-pointer text-[20px] text-blue-500" onClick={() => {handleLogout()}}>Log Out</div>
            </div>


            <div className="w-full h-[150px] flex items-start  gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
                <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
                </div>
                <div className="">
                    <div className='font-semibold text-[22px] text-white'>{profileData?.name}</div>
                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.profession || "New User"}</div>
                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.bio}</div>
                </div>
            </div>

            <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white">
                <div className="">
                    <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.posts.length}</div>
                    <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Posts</div>
                </div>

                <div className="">
                    <div className='flex items-center justify-center gap-[20px]'>
                        <div className='flex relative'>
                            {profileData?.followers?.slice(0, 3).map((user, index) => (

                                <div key={index} className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""}`}>
                                    <img src={user?.profileImage || dp} alt="" className='w-full object-cover' />
                                </div>
                            ))}


                        </div>
                        <div className='text-white text-[22px] md:text-[30px] font-semibold'>
                            {profileData?.followers.length}
                        </div>
                    </div>
                    <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Followers</div>
                </div>


                <div className="">
                    <div className='flex items-center justify-center gap-[20px]'>
                        <div className='flex relative'>

                            {profileData?.following?.slice(0, 3).map((user, index) => (


                                <div key={index} className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""}`}>
                                    <img src={user?.profileImage || dp} alt="" className='w-full object-cover' />
                                </div>
                            ))}

                        </div>
                        <div className='text-white text-[22px] md:text-[30px] font-semibold'>
                            {profileData?.following.length}
                        </div>
                    </div>
                    <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Following</div>
                </div>
            </div>


            <div className='w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]'>

                {profileData?._id == userData._id
                    &&
                    <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] text-black bg-[white] cursor-pointer rounded-2xl' onClick={() => navigate("/editprofile")}>Edit Profile</button>}


                {profileData?._id != userData._id
                    &&
                    <>

                        <FollowButton tailwind={'px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl text-black'} targetUserId={profileData?._id} onFollowChange={handleProfile} />

                        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl text-black' onClick={() => {
                            dispatch(setSelectedUser(profileData))
                            navigate("/messageArea")
                        }}>Message</button>
                    </>}

            </div>


            <div className="w-full min-h-[100vh]  flex justify-center">

                <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]'>
                        {profileData?._id == userData._id &&
                    <div className='w-[90%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center gap-[10px]' >
                    
                        <div className={`${postType == "allpost" ? "bg-black text-white shadow-2xl shadow-black" : ""} text-black  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setPostType("allpost")}>Posts</div>
                    
                        <div className={`${postType == "savedpost" ? "bg-black text-white shadow-2xl shadow-black" : ""}text-black  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setPostType("savedpost")}>Saved Post</div>

                    </div>}

                    <Nav />

                    {profileData?._id == userData._id && <>{postType == 'allpost' &&
                        postData.map((post, idx) => (
                            post.author?._id == profileData?._id && <Post post={post} key={idx} />
                        ))}
                        {postType == 'savedpost' &&
                            postData.map((post, idx) => (
                                userData.saved.includes(post._id) && <Post post={post} key={idx} />
                            ))}
                    </>}
                    {profileData?._id != userData._id &&
                        postData.map((post, idx) => (
                            post.author?._id == profileData?._id && <Post post={post} key={idx} />
                        ))}

                </div>

            </div>

        </div>
    )
}

export default Profile
