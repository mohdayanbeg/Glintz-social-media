import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const generateToken=async (id)=>{
   try {
    const token= jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"})
    return token;
   } catch (error) {
        throw new Error("Token generation failed: " + error.message);
   }
}

