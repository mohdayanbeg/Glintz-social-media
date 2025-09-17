import { v2 as cloudinary } from 'cloudinary'
// import fs from "fs"


const uploadOnCloudinary=async (fileBuffer, mimetype)=>{
    try {
         cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});
const result = await cloudinary.uploader.upload(`data:${mimetype};base64,${fileBuffer.toString('base64')}`, {
            resource_type: 'auto',
        });
return result.secure_url
    } catch (error) {
        // fs.unlinkSync(file)
        console.log(error)
    }
   
}

export default uploadOnCloudinary
