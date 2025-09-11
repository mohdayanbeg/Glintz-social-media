import uploadOnCloudinary from "../config/cloudinary.js"
import Bitz from "../models/bitz.model.js"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const getLoggedInUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).populate("posts bitz posts.author posts.comments following")
        if (!user) { return res.status(400).json({ message: "user not found" }) }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `get current user error ${error}` })
    }
}


export const suggestedUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.userId }
        }).select("-password")
        return res.status(201).json(users)
    } catch (error) {
        return res.status(500).json({ message: `get Suggested user error ${error}` })
    }
}

export const editProfile = async (req, res) => {
    try {
        const { name, userName, bio, profession, gender } = req.body
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const sameUserWithUserName = await User.findOne({ userName }).select("-password")

        if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
            return res.status(400).json({ message: "userName already exist" })
        }
        let profileImage;
        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }
        user.name = name
        user.userName = userName
        if (profileImage) {
            user.profileImage = profileImage
        }
        user.bio = bio
        user.profession = profession
        user.gender = gender

        await user.save()

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `edit profile error ${error}` })
    }
}


export const getProfile = async (req, res) => {
    try {
        const userName = req.params.userName
        const user = await User.findOne({ userName }).select("-password").populate("posts bitz followers following")
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `get profile error ${error}` });
    }
}



export const follow = async (req, res) => {
    try {
        const currentUserId = req.userId
        const targetUserId = req.params.targetUserId

        if (!targetUserId) {
            return res.status(400).json({ message: "target user is not found" })
        }

        if (currentUserId == targetUserId) {
            return res.status(400).json({ message: "you can not follow yourself." })
        }

        const currentUser = await User.findById(currentUserId)
        const targetUser = await User.findById(targetUserId)

        const isFollowing = currentUser.following.includes(targetUserId)

        if (isFollowing) {
            currentUser.following = currentUser.following.filter(id => id.toString() != targetUserId)
            targetUser.followers = targetUser.followers.filter(id => id.toString() != currentUserId)
            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following: false,
                message: "unfollowed successfully"
            })
        } else {
            currentUser.following.push(targetUserId)
            targetUser.followers.push(currentUserId)
            // if (currentUser._id != targetUser._id) {
            //     const notification = await Notification.create({
            //         sender: currentUser._id,
            //         receiver: targetUser._id,
            //         type: "follow",
            //         message: "started following you"
            //     })
            //     const populatedNotification = await Notification.findById(notification._id).populate("sender receiver")
            //     const receiverSocketId = getSocketId(targetUser._id)
            //     if (receiverSocketId) {
            //         io.to(receiverSocketId).emit("newNotification", populatedNotification)
            //     }

            // }
            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following: true,
                message: "follow successfully"
            })
        }


    } catch (error) {
        return res.status(500).json({ message: `follow error ${error}` })
    }
}