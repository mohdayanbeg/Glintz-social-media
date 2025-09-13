import express from "express"
import loginSession from "../middlewares/loginSession.js"
import { upload } from "../middlewares/multer.js"
import { getAllBitz, like, uploadBitz, comment } from "../controllers/bitz.controller.js"

const bitzRouter = express.Router()

bitzRouter.post("/upload",loginSession,upload.single("media"),uploadBitz)
bitzRouter.get("/getAll",loginSession,getAllBitz)
bitzRouter.get("/like/:bitzId",loginSession,like)
bitzRouter.post("/comment/:bitzId",loginSession,comment)

export default bitzRouter 
