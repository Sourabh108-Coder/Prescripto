const jwt=require('jsonwebtoken');

const dotenv=require("dotenv").config();

const authuser=async(req,res,next)=>
{
    try
    {
        const {token}=req.headers;

        if(!token)
        {
            res.status(401).json(
                {
                    success:false,
                    message:"Cannot get token"
                }
            )
        }

        const token_decode=jwt.verify(token,process.env.JWT_SECRET);

        req.body.userId=token_decode.id;

        // res.status(201).json(
        //     {
        //         success:true,
        //         message:"Token Extract Successfully",
        //     }
        // )

        next();
    }

    catch(error)
    {
        res.status(400).json(
            {
                success:false,
                data:error.message,
                message:"Error in extraction of id",
            }
        )
    }
}

module.exports=authuser
