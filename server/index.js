import express, { json } from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import bitzRouter from "./routes/bitz.routes.js"
import dailiezRouter from "./routes/dailiez.routes.js"
dotenv.config()

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/bitz",bitzRouter)
app.use("/api/dailiez",dailiezRouter)

let port = process.env.PORT||5000





app.listen(port,()=>{
    connectDB()
    console.log(`server running on ${port}`)
})