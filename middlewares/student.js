const z = require("zod");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '.env' });
const JWT_SECRET = process.env.JWT_SECRET;

const my_student_schema = z.object({                            //student schema with error messages to show if failed to meet
    firstname: z.string().min(3,{message:"firstname must be atleast 3 characters long"}).max(30,{message:"firstname must be atmost 30 characters long"}),
    lastname: z.string().min(3,{message:"lastname must be atleast 3 characters long"}).max(30,{message:"lastname must be atmost 30 characters long"}),
    enrollmentNumber: z.string().length(10,{message:"enrollmentNumber must be 10 characters long"}),
    dob: z.string().date(),
    });
    
function validate_student(req,res,next){                                       //validate before login,registration
    const data = req.body;
    const result = my_student_schema.safeParse(data);
    if(result.success) next();
    else {
        return res.status(404).json({msg:result.error.errors});
    }
} 

function authenticate_student(req,res,next){
    try{
        const token = req.headers['authorization']?.split(' ')[1];                  //use the token part from "bearer <token>"
        if(!token) return res.status(404).json({msg:"access token required"});
        var decoded = jwt.verify(token,JWT_SECRET);
        req.student = decoded;
        next();
    }
    catch {
        return res.status(404).json({msg:"invalid access token"});
    }
} 

module.exports = {
    validate_student,
    authenticate_student,
}