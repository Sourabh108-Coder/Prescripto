const express=require("express");

const {adddoctor,loginadmin, getalldoctors, getalladminappointments, adminappointmentcancel, admindashboard}=require("../Controlllers/admincontroller");

const{registeruser, loginuser, getuserprofile, updateuserprofile, bookappointment, listappointment, cancelappointment, paymentrazorpay, verifypayment, chatbot}=require("../Controlllers/Usercontroller");

const upload=require("../Middleware/multer");

const authadmin = require("../Middleware/authadmin");

const authuser=require("../Middleware/authuser");

const authdoctor=require("../Middleware/authdoctor");

const { changeavailabity, doctorlist, logindoctor, getparticulardoctorappointment, completedoctorAppointment, canceldoctorAppointment, doctordashboard, doctorprofile, updatedocprofile } = require("../Controlllers/doctorcontroller");

const router=express.Router();

router.post("/adddoctor", authadmin ,upload.single("image"),adddoctor);

router.post("/loginadmin",loginadmin);

router.post("/getalldoc",authadmin,getalldoctors);

router.post("/changeavailability",authadmin,changeavailabity)

router.get("/doctorsdata",doctorlist);

router.post("/registeruser",registeruser);

router.post("/loginuser",loginuser); 

router.get('/fetchuser',authuser,getuserprofile);

router.post('/bookappointment',authuser,bookappointment);

router.post('/updateprofile',upload.single('image'),authuser,updateuserprofile);

router.get("/getappointments",authuser,listappointment);

router.post("/cancelappointment",authuser,cancelappointment);

router.post("/payment-razorpay",authuser,paymentrazorpay);

router.post("/verifypayment",authuser,verifypayment);

router.get("/getadminappo",authadmin,getalladminappointments);

router.post("/cancel-admin-appointment",authadmin,adminappointmentcancel);

router.get("/dashboard",authadmin,admindashboard);

router.post("/logindoctor",logindoctor);

router.get("/particular-appointment",authdoctor,getparticulardoctorappointment);

router.post("/doctor-completed",authdoctor,completedoctorAppointment);

router.post("/cancel-doctor",authdoctor,canceldoctorAppointment);

router.get("/doctor-dashboard",authdoctor,doctordashboard);

router.get("/doctor-profile",authdoctor,doctorprofile);

router.post("/update-doctor-profile",authdoctor,updatedocprofile);

router.post("/predict",authuser,chatbot);

module.exports=router;