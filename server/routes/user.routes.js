import express from "express"
import loginSession from "../middlewares/loginSession.js"
import { getLoggedInUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/current",loginSession,getLoggedInUser)

export default userRouter 
