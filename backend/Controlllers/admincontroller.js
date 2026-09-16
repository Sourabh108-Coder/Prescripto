const doctorModel=require("../Models/doctormodel");

const  validator=require("validator");

const bcrypt=require("bcrypt");

const cloudinary=require("cloudinary").v2;

const jwt=require("jsonwebtoken");

const dotenv=require("dotenv").config();

const AppointmentModel=require("../Models/Appointmentmodel");

const UserModel=require("../Models/usermodel");

exports.adddoctor=async(req,res)=>
{
    try
    {
        const{name,email,password,speciality,degree,experience,about,fee,address}=req.body;

        const imagefile=req.file;

        if(!name ||!email ||!password ||!speciality||!degree||!experience||!about||!fee||!address)
        {
            
           return res.status(401).json(
                {
                    success:false,
                    message:"Enter Proper Fields Values",
                }
            )
        }
        
        if(!validator.isEmail(email))
        {

           return res.status(400).json(
                {
                    success:false,
                    message:"Please Enter a Valid Email",
                }
            )
        }

        if(password.length<8)
        {
           return res.status(400).json(
                {
                    success:false,
                    message:"Please Enter a Strong Password",
                }
            )   
        }

        const salt= await bcrypt.genSalt(10);

        const hashpassword=await bcrypt.hash(password,salt);

        const imageupload=await cloudinary.uploader.upload(imagefile.path,{resource_type:"image"});

        const imageurl=imageupload.secure_url;

        const doctordata={
            name,
            email,
            image:imageurl,
            password:hashpassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address:JSON.parse(address),
            date:Date.now(),
        }

        const newdoc= new doctorModel(doctordata);

        await newdoc.save();

       return res.status(201).json(
            {
                success:true,
                message:"Doctor Added",
            }
        )
    }

    

    catch(error)
    {
       return res.status(400).json(
            {
                success:false,
                data:error,
                message:"Error in Adding Doctor"
            }
        )
    }
}


exports.loginadmin=async(req,res)=>
{
    try
    {
        const{email,password}=req.body;

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
        {
            const token=jwt.sign(email+password,process.env.JWT_SECRET);

           return res.status(201).json(
                {
                    success:true,
                    data:token,
                    message:"Login Success-fully",

                }
            )
        }

        else
        {
           return res.status(401).json(
                {
                    success:false,
                    message:" Error in Login",
                }
            )
        }


    }

    catch(error)
    {
       return res.status(400).json(
            {
                success:false,
                data:error.message,
                message:"Check Your Credentials",
            }
        )
    }
}

exports.getalldoctors=async(req,res)=>
{
    try
    {
        const alldoc=await doctorModel.find({}).select('-password');

       return res.status(201).json(
            {
                success:true,
                data:alldoc,
                message:"Fetched Successfully",
            }
        )
    }

    catch(error)
    {
        return res.status(400).json(
            {
                success:false,
                data:error,
                message:'Error in Fetching',
            }
        )
    }
}

exports.getalladminappointments=async(req,res)=>
{
    try
    {
        const appointments=await AppointmentModel.find({});

        return res.status(200).json(
            {
                success:true,
                data:appointments,
                message:"Admin Appointments Fetched Successfully",
            }
        )
    }

    catch(error)
    {
        return res.status(500).json(
            {
                success:false,
                data:error.message,
                message:"Error in get Admin Appointments",

            }
        )
    }
}

exports.adminappointmentcancel=async(req,res)=>
{
    try
    {
        const{appointmentId}=req.body;

        const appointmentdata=await AppointmentModel.findById(appointmentId);

        await AppointmentModel.findByIdAndUpdate(appointmentId,{canceled:true});

        const{docId,slotdate,slottime}=appointmentdata;

        const doctordata=await doctorModel.findById(docId);

        const slotsbooked=doctordata.slots_booked;

        slotsbooked[slotdate]=slotsbooked[slotdate].filter(e=>e!==slottime);

        await doctorModel.findByIdAndUpdate(docId,{slots_booked:slotsbooked});

        res.status(201).json(
            {
                success:true,
                message:"Updated SuccessFully",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Appointment Cancelled",
            }
        )
    }
}


exports.admindashboard=async(req,res)=>
{
    try
    {
        const doctors=await doctorModel.find({});

        const users=await UserModel.find({});

        const appointments=await AppointmentModel.find({});

        const dashdata=
        {
            doctor:doctors.length,
            user:users.length,
            appointment:appointments.length,
            latestappointments:appointments.reverse().slice(0,5),
        }

        res.status(201).json(
            {
                success:true,
                data:dashdata,
                message:"Fetched Successfully",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Fetching",
            }
        )
    }
}