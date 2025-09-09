import express from "express"
import loginSession from "../middlewares/loginSession.js"
import { upload } from "../middlewares/multer.js"
import { comment, getAllPosts, like, saved, uploadPost } from "../controllers/post.controller.js"

const postRouter = express.Router()

postRouter.post("/upload",loginSession,upload.single("media"),uploadPost)
postRouter.get("/getAll",loginSession,getAllPosts)
postRouter.get("/like/:postId",loginSession,like)
postRouter.get("/saved/:postId",loginSession,saved)
postRouter.post("/comment/:postId",loginSession,comment)

export default postRouter 
