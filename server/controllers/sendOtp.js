import sendMail from "../config/Mail.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const generateOTP = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};

   export const sendOtp= async (req,res)=>{

try {

    const {email}=req.body;
    const user=await User.findOne({email})
    if(!user) return res.status(401).json({message:"user not found"});

    const otp= await generateOTP()

    user.resetOtp=otp
    user.otpExpires=Date.now() + 5*60*1000
    user.isOtpVerified=false

    await user.save()

    await sendMail(email,otp)
    res.status(201).json({message:"sent otp through mail"})
    
} catch (error) {
    return res.status(501).json({message:`send otp error: ${error}`})
}
}

    export const verifyOtp= async (req,res)=>{
        try {
            const {email,otp}=req.body
            const user = await User.findOne({email})
            if(!user && userOtp!=otp && user.otpExpires<Date.now()){return res.status(401).json({message:"Invalid or Expired OTP"})}
            user.isOtpVerified=true
            user.resetOtp=undefined
            user.otpExpires=undefined

            await user.save()

            return res.status(201).json({message:"OTP verified"})

        } catch (error) {
            
             return res.status(501).json({message:`send otp error: ${error}`})

        }
    }


    export const resetPassword=async (req,res)=>{
        try {
            const {email,password}=req.body
            const user = await User.findOne({email})
            if(!user || !user.isOtpVerified) return res.status(401).json({message:"otp verification required"})
            const hashedPassword= await bcrypt.hash(password,10)
            user.password=hashedPassword
            await user.save()
            return res.status(201).json({message:"password reset successfully"})
        } catch (error) {
            return res.status(401).json({message:"error while reseting password"})
        }
    }