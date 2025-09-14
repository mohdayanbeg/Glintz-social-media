import express from "express"
import { getAllDailiez, getDailiezByUserName, uploadDailiez, viewDailiez } from "../controllers/dailiez.controller.js"
import loginSession from "../middlewares/loginSession.js"
import { upload } from "../middlewares/multer.js"




const dailiezRouter=express.Router()

dailiezRouter.post("/upload",loginSession,upload.single("media"),uploadDailiez)
dailiezRouter.get("/getByUserName/:userName",loginSession,getDailiezByUserName)
dailiezRouter.get("/getAll",loginSession,getAllDailiez)
dailiezRouter.get("/view/:storyId",loginSession,viewDailiez)


export default dailiezRouter