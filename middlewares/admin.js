const z = require("zod");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '.env' });
const JWT_SECRET = process.env.JWT_SECRET;

const my_admin_schema = z.object({
    username: z.string().min(3,{message:"username must be atleast 3 characters long"}).max(30,{message:"username must be atmost 30 characters long"}),
    password: z.string().min(4,{message:"password must be atleast 3 characters long"}).max(10,{message:"password must be atmost 30 characters long"}),
    });
    
function validate_admin(req,res,next){
    const data = req.body;
    const result = my_admin_schema.safeParse(data);
    if(result.success) next();
    else {
        return res.status(404).json({msg:result.error.errors});
    }
} 

function authenticate_admin(req,res,next){
    try{
        const token = req.headers['authorization']?.split(' ')[1]; 
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
    validate_admin,
    authenticate_admin,
}