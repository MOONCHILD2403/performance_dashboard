const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' });

const uri = process.env.CONN_URI;
mongoose.connect(uri);

const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
        //hashed admin password, transform(trim,touppercase) , must be a unique 10 digit code
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        minlength: 4,
        maxlength: 10,
      },
  });

const studentSchema = new mongoose.Schema({
  firstname: {
    //firstname of student, transform(trim,tolowercase)
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  lastname: {
    //lastname of student, transform(trim,tolowercase)
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  enrollmentNumber: {
    //rollno of student, transform(trim,touppercase) , must be a unique 10 digit code
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    minlength: 10,
    maxlength: 10,
  },
  dob: {
    type: Date, //dob of student , must be within the range
    required: true,
    min: "1990-03-24",
    max: "2006-03-24",
  },
});

const subjectSchema = new mongoose.Schema({
  subjectname: {
    //subjectname, transform(trim,tolowercase)
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 2,
    maxlength: 30,
  },
});

const performanceSchema = new mongoose.Schema(
  {
    student_id: {
      //foreign key student id
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId, ////foreign key subject id
      ref: "Subject",
      required: true,
    },
    marks: {
      //marks of student in subject between 1 - 100
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    testDate: {
      type: Date, //date of exam of student , must be within the range
      required: true,
      min: "2015-01-01",
      max: new Date().toLocaleDateString("en-CA"),
    },
  },
  { timestamps: true }
);

const feedbackSchema = new mongoose.Schema(
  {
    student_id: {
      //foreign key student id
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    feedbackData: {
      //firstname of student, transform(trim,tolowercase)
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin",adminSchema);
const Student = mongoose.model("Student", studentSchema);
const Subjects = mongoose.model("Subjects", subjectSchema);
const Performance = mongoose.model("Performance", performanceSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = {
    Admin,
    Student,
    Subjects,
    Performance,
    Feedback,
}
