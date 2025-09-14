import express from "express"
import { upload } from "../middlewares/multer.js"
import loginSession from "../middlewares/loginSession.js"
import { getAllMessages, getPrevUserChats, sendMessage } from "../controllers/message.controller.js"






const messageRouter=express.Router()

messageRouter.post("/send/:receiverId",loginSession,upload.single("image"),sendMessage)
messageRouter.get("/getAll/:receiverId",loginSession,getAllMessages)
messageRouter.get("/prevChats",loginSession,getPrevUserChats)

export default messageRouter