import uploadOnCloudinary from "../config/cloudinary.js";
import Bitz from "../models/bitz.model.js";
import User from "../models/user.model.js";



export const uploadBitz=async (req,res)=>{
    try {
        
        const { caption} = req.body
        let media;
        if (req.file) {
            media = await uploadOnCloudinary(req.file.path)
        } else {
            return res.status(400).json({ message: "media is required" })
        }

        const bitz = await Bitz.create({
            caption, media, author: req.userId
        })
        const user = await User.findById(req.userId)
        user.bitz.push(bitz._id)
        await user.save()
        const populatedBitz = await Bitz.findById(bitz._id).populate("author", "name userName profileImage")
         return res.status(201).json(populatedBitz)
    } catch (error) {
        return res.status(500).json({ message: `uploadBitz error ${error}` })
    }
}




export const like = async (req, res) => {
    try {
        const bitzId = req.params.bitzId
        const bitz = await Bitz.findById(bitzId)
        if (!bitz) {
            return res.status(400).json({ message: "bitz not found" })
        }
        const alreadyLiked = bitz.likes.some(id => id.toString() == req.userId.toString())

        if (alreadyLiked) {
            bitz.likes = bitz.likes.filter(id => id.toString() != req.userId.toString())
        }else{
            bitz.likes.push(req.userId)
        }
        await bitz.save()
        await bitz.populate("author", "name userName profileImage")
        return res.status(200).json(bitz)
    } catch (error) {
         return res.status(500).json({ message: `likebitz error ${error}` })
    }
}




export const comment = async (req, res) => {
    try {
        const {message}=req.body
        const bitzId = req.params.bitzId
        const bitz = await Bitz.findById(bitzId)
        if (!bitz) {
            return res.status(400).json({ message: "bitz not found" })
        }
        bitz.comments.push({
            author:req.userId,
            message
        })
        await bitz.save()
        await bitz.populate("author", "name userName profileImage")
        await bitz.populate("comments.author")
        return res.status(200).json(bitz)
    } catch (error) {
         return res.status(500).json({ message: `comment bitz error ${error}` })
    }
}


export const getAllBitz=async (req,res)=>{
    try {
        const bitz=await Bitz.find({}).populate("author","name userName profileImage")
        .populate("comments.author")
        return res.status(200).json(bitz)
    } catch (error) {
        return res.status(500).json({message:`get all bitz error ${error}`})
    }
}
