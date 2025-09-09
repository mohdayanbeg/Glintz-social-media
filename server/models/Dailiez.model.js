import mongoose from "mongoose";

const dailiezSchema=new mongoose.Schema({
    author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        mediaType:{
            type:String,
            enum:["image","video"],
            required:true
        },
        media:{
            type:String,
            required:true,
        },
        viewers:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:86400,
        }


},{timestamps:true})

const Dailiez= mongoose.model("Dailiez",dailiezSchema)

export default Dailiez;