const express = require("express");
const {Performance} = require("../connect");
const {authenticate_student} = require("../middlewares/student");

const Router = express.Router();                                     //authenticate student

Router.use(authenticate_student);

Router.get("/average", async(req,res)=>{                            //returns average of student for all subjects
    try{
        const student_id = req.student.studentid;
        const results = await Performance.aggregate([
            {
                $match: { student_id: student_id }
            },
            {
                $group: {
                    _id: "$subject_id",                                 // Group by subject
                    average_score: { $avg: "$marks" }                   // Calculate average score
                }
            }
        ]);
        res.status(200).json({results});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

Router.get("/:subject_id", async(req,res)=>{                        //returns performance of student for a particular subject over time
    try{
        const subject_id = req.params.subject_id;
        const student_id = req.student.studentid;
        const results = await Performance.find({
            student_id:student_id,
            subject_id:subject_id,
        }).sort({testDate: 1});
        res.status(200).json({results});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

Router.post("/:subject_id", async(req,res)=>{                       //add a new entry for marks of student in an exam of a subject
    try{
        const subject_id = req.params.subject_id;
        const student_id = req.student.studentid;
        const marks = req.body.marks;
        const results = await Performance.create({
            student_id: student_id,
            subject_id: subject_id,
            marks: marks,
            testDate: new Date().toLocaleDateString("en-CA"),
        })
        res.status(200).json({msg:"marks added successfully"});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

module.exports = Router;