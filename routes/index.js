const express = require("express");

const admin = require("./admin");
const feedback = require("./feedback");
const performance = require("./performance");
const student = require("./student");
const trend = require("./trend");

const Router = express.Router();

Router.use("/student",student);
Router.use("/admin",admin);
Router.use("/feedback",feedback);
Router.use("/student/performance",performance);
Router.use("/student/trend",trend);


module.exports = Router;