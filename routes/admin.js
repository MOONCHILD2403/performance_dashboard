const express = require("express");
const {validate_admin, authenticate_admin} = require("../middlewares/admin");
const {Admin,Subjects} = require("../connect");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const Router = express.Router();

Router.post("/register",validate_admin,async(req,res)=>{
    try{
        const data = req.body;
        const result = await Admin.create(data);
        return res.status(200).json({msg:`Admin created successfully with id : ${result._id}`});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

Router.post("/login",async(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const result = await Admin.findOne({
            username:username,
            password:password,
        })
        const token = jwt.sign({adminid:result._id},JWT_SECRET);
        return res.status(200).json({msg:`access token created successfully : ${token}`});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

Router.post("/subject",authenticate_admin,async(req,res)=>{
    try{
        const subject = req.body.subject;
        const result = await Subjects.create({
            subjectname:subject,
        })
        res.status(200).json({msg:`subject added successfully with id ${result._id}`});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})


module.exports = Router;