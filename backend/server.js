const express=require("express");

const cors=require("cors");

const dotenv=require("dotenv").config();

const app=express();

const approutes=require("./Routes/approutes");

const connectdb=require("./config/database");

const connectcloudinary=require("./config/cloudinary");

const PORT=process.env.PORT|| 8000;

app.use(express.json());

app.use(cors());

app.use("/api/v1/prescripto",approutes);

app.get("/",(req,res)=>
{
    res.send("Hello All Doctors")
})

app.listen(PORT,()=>{
    console.log("~~~~~~Server Started At the port "+PORT+"~~~~~~");
});

connectdb();

connectcloudinary();


