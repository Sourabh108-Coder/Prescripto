const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
        },

        email:
        {
            type:String,
            required:true,
            unique:true,
        },

        password:
        {
            type:String,
            required:true
        },

        image:
        {
            type:String,
            default:"https://icon-library.com/images/upload-image-icon-png/upload-image-icon-png-20.jpg",
        },

        address:
        {
            type:Object,
            default:
            {
                line1:"",
                line2:"",
            }
        },

        gender:
        {
            type:String,
            default:"Not Selected",
        },

        dob:
        {
            type:String,
            default:"Not Selected",
        },

        phone:
        {
            type:String,
            default:"0000000000",
        }
    }
);

const UserModel=mongoose.models.User || mongoose.model("User",userSchema);

module.exports=UserModel

