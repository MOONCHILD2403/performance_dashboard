const express = require("express");
const routeHandler = require("./routes/index");

const app = express();
app.use(express.json());                          
app.use("/api/v1",routeHandler);

app.use((req,res,next)=>{
    res.status(404).json({msg:'Route Not Found'});    //for any undefined routes
})

app.use((err,req,res,next)=>{
    res.status(404).json({"global catch":err});       //global catch to stop code from breaking while testing
})

app.listen(3000,()=>{console.log("server running successfully")})