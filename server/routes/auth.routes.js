import express, { Router } from "express"
import { signIn, signOut, signUp } from "../controllers/auth.controllers.js"
import { resetPassword, sendOtp, verifyOtp } from "../controllers/sendOtp.js"
import sendMail from "../config/Mail.js"

const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.get("/signout",signOut)

authRouter.post("/sendotp",sendOtp)
authRouter.post("/verifyotp",verifyOtp)
authRouter.post("/resetpassword",resetPassword)

export default authRouter