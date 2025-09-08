import mongoose from "mongoose"

const bitzSchema = new mongoose.Schema({
    author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        media:{
            type:String,
            required:true,
        },
        caption:{
            type:String
        },
        likes:[
            {type:mongoose.Schema.Types.ObjectId,
            ref:"User"}
        ],
        comments:[
            {author:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            message:{
                type:String
            }
        }
        ]
    },{timestamps:true})

const Bitz = mongoose.model("Bitz",bitzSchema)

export default Bitz;