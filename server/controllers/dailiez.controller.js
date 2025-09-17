import uploadOnCloudinary from "../config/cloudinary.js"
import Dailiez from "../models/Dailiez.model.js"
import User from "../models/user.model.js"

export const uploadDailiez = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if (user.dailiez) {
            await Dailiez.findByIdAndDelete(user.dailiez)
            user.dailiez = null

        }

        const { mediaType } = req.body
        let media;
        if (req.file) {
            media = await uploadOnCloudinary(req.file.buffer, req.file.mimetype)
        } else { return res.status(400).json({ messgae: "media is required" }) }
        const dailiez = await Dailiez.create({
            author: req.userId, mediaType, media
        })
        user.dailiez = dailiez._id
        await user.save()
        const populatedDailiez = await Dailiez.findById(dailiez._id).populate("author", "name userName profileImage").populate("viewers", "name userName profileImage")
        return res.status(200).json(populatedDailiez)
    } catch (error) {
        return res.status(500).json({ message: "dailiez upload error" })
    }
}




export const viewDailiez = async (req, res) => {
    try {
        const dailiezId = req.params.dailiezId
        const dailiez = await Dailiez.findById(dailiezId)

        if (!dailiez) {
            return res.status(400).json({ message: "story not found" })
        }

        const viewersIds = dailiez.viewers.map(id => id.toString())
        if (!viewersIds.includes(req.userId.toString())) {
            // console.log("1st",dailiez);
            
            dailiez.viewers.push(req.userId)
            // console.log("2nd",dailiez);
            
            await dailiez.save()
        }
        const populatedDailiez = await Dailiez.findById(dailiez._id).populate("author", "name userName profileImage").populate("viewers", "name userName profileImage")
        return res.status(200).json(populatedDailiez)

    } catch (error) {
        return res.status(500).json({ message: "dailiez upload error" })
    }
}



export const getDailiezByUserName= async (req,res)=>{
    try {
        const userName=req.params.userName
        console.log("server params user name: ", userName);
        
        const user=await User.findOne({userName})
        if(!user){
             return res.status(400).json({ message: "user not found" })
        }
        console.log("Found user with ID:", user._id);
        const dailiez=await Dailiez.find({

            author:user._id
        }).populate("viewers author")
        console.log("Found dailies:", dailiez);
         return res.status(200).json(dailiez)
    } catch (error) {
         return res.status(500).json({ message: "dailiez get by userName error" })
    }
}



export const getAllDailiez=async (req,res)=>{
    try {
        const currentUser=await User.findById(req.userId)
        const followingIds=currentUser.following

        const dailiezs=await Dailiez.find({
            author:{$in:followingIds}
        }).populate("viewers author")
           .sort({createdAt:-1})

           return res.status(200).json(dailiezs)


    } catch (error) {
           return res.status(500).json({ message: "All dailiezs get error" })
    }
}
