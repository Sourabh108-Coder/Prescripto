const jwt=require("jsonwebtoken");

const dotenv=require("dotenv").config();


const authadmin=async(req,res,next)=>
{
    try
    {
        const {adtoken}=req.headers;

        if(!adtoken)
        {
            res.status(400).json(
                {
                    success:false,
                    message:"You Don't have Permission",
                }
            )
        }

        const tokendecode=jwt.verify(adtoken,process.env.JWT_SECRET);

        if(tokendecode!==process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD)
        {
            res.status(400).json(
                {
                    success:false,
                    message:"You Don't have Permission",
                }
            )
        }

        next();
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Permission denied",
            }
        )
    }
}

module.exports=authadmin