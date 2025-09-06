import mongoose, { Mongoose } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,

    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    bitz:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bitz"
    }],
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    dailiez:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Dailiez"
    }],
    resetOtp:{
        type:String,

    },
    otpExpires:{
        type:Date
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    },

},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User;