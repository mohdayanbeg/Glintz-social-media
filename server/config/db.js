import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected")
    } catch (error) {
        res.status(401).send("message: ",error)
    }
}

export default connectDB