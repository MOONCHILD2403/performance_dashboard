const express = require("express");
const {validate_student} = require("../middlewares/student");
const {Student} = require("../connect");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const Router = express.Router();

Router.post("/register",validate_student,async(req,res)=>{
    try{
        const data = req.body;
        const result = await Student.create(data);
        return res.status(200).json({msg:`student created successfully with id : ${result._id}`});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

Router.post("/login",async(req,res)=>{
    try{
        const rollno = req.body.enrollmentNumber;
        const result = await Student.findOne({
            enrollmentNumber:rollno,
        })
        const token = jwt.sign({studentid:result._id},JWT_SECRET);
        return res.status(200).json({msg:`access token created successfully : ${token}`});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

module.exports = Router;