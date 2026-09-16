const doctorModel=require("../Models/doctormodel");

const bcrypt=require("bcrypt");

const jwt=require('jsonwebtoken');

const dotenv=require("dotenv").config();

const AppointModel=require("../Models/Appointmentmodel");
const AppointmentModel = require("../Models/Appointmentmodel");

exports.changeavailabity=async(req,res)=>
{
    try
    {
        const{docId}=req.body;

        const docdata=await doctorModel.findById({ _id: docId });

        console.log(docdata);

        const updatedDoc=await doctorModel.findByIdAndUpdate(docId,{available:!docdata.available});

        res.status(201).json(
            {
                success:true,
                data:updatedDoc,
                message:"Update SuccessFully",

            }
        )
    }

    catch(error)
    {
        res.status(400).json(
            {
                success:false,
                data:error.message,
                message:"Error in Changing"
            }
        )
    }
}

exports.doctorlist=async(req,res)=>
{
    try
    {
        const doctors=await doctorModel.find({}).select(['-password','-email']);


        res.status(201).json(
            {
                success:true,
                data:doctors,
                message:"Fetched successfully",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Fetching"

            }
        )
    }
}

exports.logindoctor=async(req,res)=>
{
    try
    {
        const{email,password}=req.body;

        const doctor=await doctorModel.findOne({email});

        if(!doctor)
        {
            return res.status(405).json(
                {
                    success:false,
                    message:"Invalid Credentials",
                }
            )
        }

        const ismatch=await bcrypt.compare(password,doctor.password);

        if(ismatch)
        {
            const doctoken=jwt.sign({id:doctor._id},process.env.JWT_SECRET);

           return res.status(201).json(
                {
                    success:true,
                    data:doctoken,
                    message:"Login Successfully",
                }
            )
        }

        else
        {
           return res.status(403).json(
                {
                    success:false,
                    message:"Invalid Password",
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
                message:"Error in Login",
            }
        )
    }
}

exports.getparticulardoctorappointment=async(req,res)=>
{
    try
    {

        const{docId}=req.body;

        const appointment=await AppointModel.find({docId});

        res.status(201).json(
            {
                success:true,
                data:appointment,
                message:"Fetched Successfully",
            }
        )

       
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:true,
                data:error.message,
                message:"Error in Fetching",
            }
        )
    }
}

exports.completedoctorAppointment=async(req,res)=>
{
    try
    {
        const{docId,appointmentId}=req.body;

        const appointmentdata=await AppointmentModel.findById(appointmentId);

        if(appointmentdata && appointmentdata.docId===docId)
        {
            await AppointModel.findByIdAndUpdate(appointmentId,{iscompleted:true});

            return res.status(201).json(
                {
                    success:true,
                    message:"Completed SuccessFully",
                }
            )
        }

        else
        {
            return res.status(405).json(
                {
                    success:false,
                    message:"Completion Failed",
                }
            )
        }
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:true,
                data:error.message,
                message:"Error in Completion",

            }
        )
    }
}



exports.canceldoctorAppointment=async(req,res)=>
    {
        try
        {
            const{docId,appointmentId}=req.body;
    
            const appointmentdata=await AppointmentModel.findById(appointmentId);
    
            if(appointmentdata && appointmentdata.docId===docId)
            {
                await AppointModel.findByIdAndUpdate(appointmentId,{canceled:true});
    
                return res.status(201).json(
                    {
                        success:true,
                        message:"Cancelled SuccessFully",
                    }
                )
            }
    
            else
            {
                return res.status(405).json(
                    {
                        success:false,
                        message:"Cancellation Failed",
                    }
                )
            }
        }
    
        catch(error)
        {
            res.status(401).json(
                {
                    success:true,
                    data:error.message,
                    message:"Error in Completion",
    
                }
            )
        }
    }


exports.doctordashboard=async(req,res)=>
{
    try
    {
        const{docId}=req.body;

        const appointments=await AppointModel.find({docId:docId});

        let earings=0;

        appointments.map((item)=>
        {
            if(item.iscompleted || item.payment)
            {
                earings+=item.amount;
            }
        })

        let patients=[];

        appointments.map((item)=>
        {
            if(!patients.includes(item.userId))
            {
                patients.push(item.userId);
            }
        })

        const dashdata={
            earings,
            appointments:appointments.length,
            patients:patients.length,
            latestappointments:appointments.reverse().slice(0,5),
        }

        res.status(201).json(
            {
                success:true,
                data:dashdata,
                message:"Data Collected Successfully",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.meesage,
                message:"Error in Dashboard"
            }
        )
    }
}

exports.doctorprofile=async(req,res)=>
{
    try
    {
        const{docId}=req.body;

        const doctorprodata=await doctorModel.findById(docId).select("-password");

        res.status(201).json(
            {
                success:true,
                data:doctorprodata,
                message:"Profile Fetched Successfully",
            }
        )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                data:error.message,
                message:"Error in Fetching Profile",
            }
        )
    }
}


exports.updatedocprofile=async(req,res)=>
{
    try
    {
        const{docId,fee,address,available}=req.body;

        await doctorModel.findByIdAndUpdate(docId,{fee,address,available});

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
                message:"Error in Updating",
            }
        )
    }
}