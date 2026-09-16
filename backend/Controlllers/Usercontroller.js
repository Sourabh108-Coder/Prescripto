const UserModel=require("../Models/usermodel");

const validator=require("validator");

const bcrypt=require("bcrypt");

const jwt=require('jsonwebtoken');

const doctorModel = require("../Models/doctormodel");

const cloudinary=require('cloudinary').v2;

const dotenv=require("dotenv").config();

const razorpay=require('razorpay');

const AppointmentModel=require('../Models/Appointmentmodel');

const axios = require('axios');


exports.registeruser=async(req,res)=>
{
    try
    {
        const{name,email,password}=req.body;

        if(!name ||!email ||!password)
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"Missing Details",
                }
            )
        }

        if(!validator.isEmail(email))
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"Invalid Email",

                }
            )
        }

        if(password.length<8)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Enter a strong Password",
                }
            )
        }

        const salt=await bcrypt.genSalt(10);

        const hashpassword= await bcrypt.hash(password,salt);

        const userdata={
            name,
            email,
            password:hashpassword,
        }

        const newuser=new UserModel(userdata);

        const user=await newuser.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

        return res.status(201).json(
            {
                success:true,
                data:token,
                message:"Register Successfully",
            }
        )
    }

    catch(error)
    {

        return res.status(400).json(
            {
                success:false,
                data:error.message,
                message:"Error in Signing"
            }
        )
    }

}

exports.loginuser=async(req,res)=>
{
    try
    {
        const{email,password}=req.body;

        const user=await UserModel.findOne({email});

        if(!user)
        {
            res.status(401).json(
                {
                    success:false,
                    message:"User Does'nt exist",
                }
            )
        }

        const ismatch=await bcrypt.compare(password,user.password);

        if(ismatch)
        {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

            res.status(201).json(
                {
                    success:true,
                    data:token,
                    message:"Login Successfully"
                }
            )
        }

        else
        {
            res.status(401).json(
                {
                    success:false,
                    message:"Password does'nt match",
                }
            )
        }

    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Login User",
            }
        )
    }
}


exports.getuserprofile=async(req,res)=>
{
    try
    {
        const{userId}=req.body;

        const newuser=await UserModel.findById(userId).select('-password');

        res.status(201).json(
            {
                success:true,
                data:newuser,
                message:"User Fetched Successfully"
            }
        )
    }
    

    catch(error)
    {
        res.status(400).json(
            {
                success:false,
                data:error.message,
                message:"Error in Fetching User Data"
            }
        )
    }
}

exports.updateuserprofile=async(req,res)=>
{
    try
    {
        const{userId,name,phone,address,dob,gender}=req.body;

        const imagefile=req.file;

        if(!name||!phone||!dob||!gender)

            {
                res.status(400).json(
                    {
                        success:false,
                        message:"Data Missing",
                    }
                )
            }

            await UserModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

            if(imagefile)
            {
                const imageupload=await cloudinary.uploader.upload(imagefile.path,{resource_type:"image"});

                const imageUrl=imageupload.secure_url;

                await UserModel.findByIdAndUpdate(userId,{image:imageUrl});
            }

            res.status(201).json(
                {
                    success:true,
                    message:"Profile Updated",
                }
            )

    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Updation",
            }
        )
    }
}

exports.bookappointment=async(req,res)=>
{
    try
    {
        const{userId,docId,slotdate,slottime}=req.body;

        const docdata=await doctorModel.findById(docId).select('-password');

        if(!docdata.available)
        {
            return res.status(203).json(
                {
                    success:false,
                    message:"Doctor Not Available",
                }
            )
        }

        let slotsbooked=docdata.slots_booked;

        if(slotsbooked[slotdate])
        {
            if(slotsbooked[slotdate].includes(slottime))
            {
               return res.status(200).json(
                    {
                        success:false,
                        message:"Slot not Available",
                    }
                )
            }

            else
            {
                slotsbooked[slotdate].push(slottime);
            }
        }

        else
        {
            slotsbooked[slotdate]=[];
            slotsbooked[slotdate].push(slottime);
        }

        const userdata=await UserModel.findById(userId).select('-password');

        delete docdata.slots_booked;

        const appointmentdata={
            userId,
            docId,
            userdata,
            docdata,
            amount:docdata.fee,
            slottime,
            slotdate,
            date:Date.now(),
        }

        const newappointment=new AppointmentModel(appointmentdata);

        await newappointment.save();

        await doctorModel.findByIdAndUpdate(docId,{slots_booked:slotsbooked});

       return res.status(201).json(
            {
                success:true,
                message:"Appointment Booked Successfully",
            }
        )
    }

    catch(error)
    {
        return res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in booking",
            }
        )
    }
}

exports.listappointment=async(req,res)=>
{
    try
    {
        const{userId}=req.body;

        const appointments=await AppointmentModel.find({userId});

        return res.status(201).json(
            {
                success:true,
                data:appointments,
                message:"Listed SuccessFully",
            }
        )
    }

    catch(error)
    {
        return res.status(401).json(
            {
                success:true,
                data:error.message,
                message:"Error in Listing Appointment",
            }
        )
    }
}

exports.cancelappointment=async(req,res)=>
{
    try
    {
        const {userId,appointmentId}=req.body;

        const appointmentdata=await AppointmentModel.findById(appointmentId);

        if(appointmentdata.userId!==userId)
        {
            return res.status(204).json(
                {
                    success:false,
                    message:"Unauthorized Action",
                }
            )
        }

        await AppointmentModel.findByIdAndUpdate(appointmentId,{canceled:true});

        const{docId,slotdate,slottime}=appointmentdata;

        const doctordata=await doctorModel.findById(docId);

        let slotsbooked=doctordata.slots_booked;

        slotsbooked[slotdate]=slotsbooked[slotdate].filter(e=>e!==slottime);

        await doctorModel.findByIdAndUpdate(docId,{slots_booked:slotsbooked});

        res.status(201).json(
            {
                success:true,
                message:"Appointment Cancelled SuccessFully",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Cancelling",
            }
        )
    }
}

const razorpayinstance=new razorpay(
    {
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_SECRET_KEY,
    }
)

exports.paymentrazorpay=async(req,res)=>
{
    try
    {
        const{appointmentId}=req.body;

        const appointmentdata=await AppointmentModel.findById(appointmentId);

        if(!appointmentdata|| appointmentdata.canceled)
        {
           return res.status(403).json(
                {
                    success:false,
                    message:"Appointment is Cancelled",
                }
            )
        }

        const options={
            amount:appointmentdata.amount*100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
        }

        const order=await razorpayinstance.orders.create(options)

        res.status(201).json(
            {
                success:true,
                data:order,
                message:"Payment Successfull",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Payment",
            }
        )
    }
}

exports.verifypayment=async(req,res)=>
{
    try
    {
        const{razorpay_order_id}=req.body;

        const orderinfo=await razorpayinstance.orders.fetch(razorpay_order_id);

        console.log(orderinfo);

        if(orderinfo.status==="paid")
        {
            const appointmentdata=await AppointmentModel.findByIdAndUpdate(orderinfo.receipt,{payment:true});

            return res.status(201).json(
                {
                    success:true,
                    message:"Updated Successfully",
                }
            )
        }

        else
        {
            res.status(405).json(
                {
                    success:false,
                    message:"Payment Failed",
                }
            )
        }
    }

    catch(error)
    {
        return res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Verifying",
            }
        )
    }
}

exports.chatbot = async(req,res) =>
{
    try
    {
        const{userId,text} = req.body;

        const user = await UserModel.findById(userId);

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User Not Found",
            })
        }

        // Fast Api Response

       const fastapiResponse = await axios.post(
          "http://127.0.0.1:5000/predict",
          {
            text: text,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      return res.status(200).json({
        success: true,
        data: fastapiResponse.data,
      });
    }

     catch(error)
    {
        return res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Prediction",
            }
        )
    }
}

