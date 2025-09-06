import express from "express";
import jwt from "jsonwebtoken";

const loginSession= async (req,res,next)=>{
    try {
        const token = req.cookies.token
        
        if(!token) return res.status(400).send("no login session");
        const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId=decoded.id

        next()

    } catch (error) {
        res.status(501).send("loggin session error")
    }
}

export default loginSession