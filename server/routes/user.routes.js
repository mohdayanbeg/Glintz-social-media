import express from "express"
import loginSession from "../middlewares/loginSession.js"
import { editProfile, getLoggedInUser, suggestedUsers } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/current",loginSession,getLoggedInUser)
userRouter.get("/suggested",loginSession,suggestedUsers)
userRouter.get("/editprofile",loginSession,editProfile)

export default userRouter 
