import User from "../models/user.model.js"

export const getLoggedInUser= async (req,res)=>{
    try {
        const userId=req.userId
        const user = await User.findById(userId)
        if(!user){return res.send("logged in user not found")}
        return res.status(200).json({
      message: "User found successfully",
      user: {
        _id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
      }
    });
    } catch (error) {
        return res.status(500).send("user controller error")
    }
}