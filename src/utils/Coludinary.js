import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOYDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return "Could not find the Path!"; //Nhi mila to ye retutn kro
    
    //Upload file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, 
      {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath) //file will remove from local storage after uploading on Cloudinary.
    return response;

    //file has been uploaded successfully
    //console.log("File is uploaded on Cloudinary!", response.url);
  } catch (error) {
    fs.unlinkSync(localFilePath); //Delete the file from local storage when failed to upload on Cloudinary.
    return null;
  }
  };

export { uploadOnCloudinary };
