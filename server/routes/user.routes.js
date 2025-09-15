import express from "express"
import loginSession from "../middlewares/loginSession.js"
import { editProfile, follow, followingList, getAllNotifications, getLoggedInUser, getProfile, markAsRead, search, suggestedUsers } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.get("/current", loginSession, getLoggedInUser)
userRouter.get("/suggested", loginSession, suggestedUsers)
userRouter.get("/getProfile/:userName", loginSession, getProfile)
userRouter.get("/follow/:targetUserId", loginSession, follow)
userRouter.get("/followingList", loginSession, followingList)
userRouter.get("/search", loginSession, search)
userRouter.get("/getAllNotifications", loginSession, getAllNotifications)
userRouter.get("/markedAsRead", loginSession, markAsRead)
userRouter.post("/editprofile", loginSession, upload.single("profileImage"), editProfile)

export default userRouter 
