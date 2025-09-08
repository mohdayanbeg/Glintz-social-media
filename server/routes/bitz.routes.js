import express from "express"
import loginSession from "../middlewares/loginSession.js"
import { upload } from "../middlewares/multer.js"

const bitzRouter = express.Router()

bitzRouter.post("/upload",loginSession,upload.single("media"),uploadPost)
bitzRouter.get("/getAll",loginSession,getAllPosts)
bitzRouter.get("/like/:postId",loginSession,like)

export default bitzRouter 
