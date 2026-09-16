const jwt=require("jsonwebtoken");

const dotenv=require("dotenv").config();


const authdoctor=async(req,res,next)=>
{
    try
    {
        const{doctoken}=req.headers;

        if(!doctoken)
        {
            return res.status(302).json(
                {
                    success:false,
                    message:"Token not Available",
                }
            )
        }

        const tokendecode=jwt.verify(doctoken,process.env.JWT_SECRET);

        req.body.docId= tokendecode.id;

        next();
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in verifying",

            }
        )
    }
}

module.exports=authdoctor