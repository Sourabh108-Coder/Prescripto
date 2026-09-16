const mongoose=require("mongoose");

const dotenv=require("dotenv").config();

const connectdb=async()=>
{
    await mongoose.connect(`${process.env.MONGODB_URI}/priscripto`).then(()=>
        {
            console.log("~~~~~~DATABASE CONNECTED SUCCESSFULLY~~~~~~")
        })
    
        .catch((error)=>
        {
            console.log("Error in connecting Database");
            console.log(error.message);
            process.exit(0);
        });
}

module.exports=connectdb