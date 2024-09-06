const express = require("express");
const {Performance} = require("../connect");
const {authenticate_student} = require("../middlewares/student");

const Router = express.Router();

Router.use(authenticate_student);

const analyzeTrends = (performanceData) => {         //custom function to see scores are improving/dropping over time for each subject taken by student
    if (performanceData.length === 0) {
        return { message: "No performance data available." };
    }

    const trendAnalysis = {};
    let previousScore = null;

    performanceData.forEach(entry => {
        const subject = entry.subject_id;
        const currentScore = entry.marks;
        
        if (!trendAnalysis[subject]) {
            trendAnalysis[subject] = {
                scores: [],
                trend: 'too little data', 
                latestScore: currentScore
            };
        }

        trendAnalysis[subject].scores.push(`date: ${entry.testDate}, score: ${currentScore}`);
        trendAnalysis[subject].latestScore = currentScore;

        if (previousScore !== null) {
            if (currentScore > previousScore) {
                trendAnalysis[subject].trend = 'improving';
            } else if (currentScore < previousScore) {
                trendAnalysis[subject].trend = 'declining';
            }
        }

        previousScore = currentScore; 
    });

    return trendAnalysis; 
}

Router.get("/", async(req,res)=>{                   //return the trend of student for all subjects
    try{
        const student_id = req.student.studentid;
        const results = await Performance.find({
            student_id:student_id,
        }).sort({testDate: 1});
        const trends = analyzeTrends(results)
        res.status(200).json({trends});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})

Router.get("/:subject_id", async(req,res)=>{        //returns trend for a particular subject
    try{
        const student_id = req.student.studentid;
        const subject_id = req.params.subject_id;
        const results = await Performance.find({
            student_id:student_id,
            subject_id:subject_id,
        }).sort({testDate: 1});
        const trends = analyzeTrends(results)
        res.status(200).json({trends});
    }
    catch(err){
        return res.status(404).json({"error":err});
    }
})


module.exports = Router;