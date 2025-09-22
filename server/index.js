import express, { json } from "express"
import dotenv from "dotenv"
import  connectDB  from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import bitzRouter from "./routes/bitz.routes.js"
import dailiezRouter from "./routes/dailiez.routes.js"
import messageRouter from "./routes/message.routes.js"
import { app, server } from "./socket.js"

dotenv.config()

let port = process.env.PORT||5000

app.set('trust proxy', 1);

app.use(cors({
    origin:"https://glintz.onrender.com",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())


const url = `https://glintz.onrender.com/`;
const interval = 30000;

function reloadWebsite() {
  axios.get(url).then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);



app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/bitz",bitzRouter)
app.use("/api/dailiez",dailiezRouter)
app.use("/api/message",messageRouter)






server.listen(port,()=>{
    connectDB()
    console.log(`server running on ${port}`)
})
