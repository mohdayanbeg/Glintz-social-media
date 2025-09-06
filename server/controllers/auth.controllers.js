import { generateToken } from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { ToastContainer, toast } from 'react-toastify';

export const signUp= async (req,res)=>{
    try {
        let {name,userName,email,password}=req.body
        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).send("User Alredy exist!")
        }
        existUser= await User.findOne({userName})
        if(existUser){
            return res.status(400).send("User Alredy exist!")
        }
        let passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      });
    }

        let hashedPassword=await bcrypt.hash(password,10)
        const user =await User.create({
            name,
            userName,
            email,
            password:hashedPassword,
        })
        const token = await generateToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge:30*24*60*60*1000
        })
        return res.status(201).send(user)
    } catch (error) {
        res.status(501).send("SignUp error")
    }
}

export const signIn=async(req,res)=>{
    try {
        const {userName,password}=req.body;
        const user=await User.findOne({userName})
        if(!user) return res.status(401).send("user not found");

        const checkPassword=await bcrypt.compare(password,user.password)
        if(!checkPassword) return res.status(401).send("wrong credentials");

        const token =await generateToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:true,
            maxAge:30*24*60*60*1000
        })
        res.status(201).send(user)
    } catch (error) {
        return res.status(501).send(error)
    }
    
}

export const signOut=async(req,res)=>{
    try {
        res.clearCookie("token")
        return  res.send("logout successfully")
    } catch (error) {
        return res.send(error)
    }
} 