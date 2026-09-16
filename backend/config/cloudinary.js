const cloudinary=require("cloudinary").v2

const dotenv=require("dotenv").config();

const connectcloudinary=async()=>
{
    try
    {
        cloudinary.config(
            {
                cloud_name:process.env.CLOUDINARY_NAME,
                api_key:process.env.CLOUDINARY_API_KEY,
                api_secret:process.env.CLOUDINARY_SECRET_KEY,
            }
        )

        console.log("~~~~~~CLOUDINARY CONNECT SUCCESSFULLY~~~~~~");
    }

    catch(error)
    {
        console.log("~~~~~~Error in connection to Cloudinary~~~~~~")
    }
}

module.exports=connectcloudinary