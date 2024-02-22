const { Student } = require("../models/studentModel");
const { Teacher } = require("../models/teacherModel");
const { Complain } = require("../models/complainModel");

const { Admin } = require("../models/adminModel");

exports.admin = async (req, res) => {
  const usernameInput = req.body.email;
  const passwordInput = req.body.password;
  const result = await Admin.findOne({ username: usernameInput });
  console.log(result);
  const studNum = await Student.find();
  const len = studNum.length;
  const teachNum = await Teacher.find();
  const lenTeach = teachNum.length;

  if (result) {
    if (result.password == passwordInput) {
      req.session.studentId = result._id; // Store user ID in the session
      res.render("adminDashboard", {
        adminName: result.name.first + " " + result.name.last,
        result: result,
        studLen: len,
        teachNum: lenTeach,
      });
    } else {
      console.log("wrong password");
    }
  } else {
    console.log("no such user sorry (:");
  }
};

exports.addStudent = async (req, res) => {
  const fname = req.body.first_name;
  const lname = req.body.last_name;
  const username = req.body.username;
  const password = req.body.password;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const address = req.body.address;
  const phone = req.body.phone;
  const emergencyName = req.body.emergency_name;
  const emergencyPhone = req.body.emergency_phone;
  const rollNum = req.body.rollNum;
  const grade = req.body.grade;
  const school = req.body.school;
  var subject = req.body.subjects;
  var subjectList = subject.split(",");
  var lst = [];
  for (var i = 0; i < subjectList.length; i++) {
    lst.push([subjectList[i], 0]);
  }

  const success = await Student.create({
    name: {
      first: fname,
      last: lname,
    },
    username: username,
    password: password,
    gender: gender,
    dob: dob,
    address: address,
    phone: phone,
    emergency: {
      name: emergencyName,
      phone: emergencyPhone,
    },
    subjects: lst,
    rollNum: rollNum,
    grade: grade,
    school: school,
  });
  if (success) {
    res.send("Successfully added");
  } else {
    res.send("Failed to add a student");
  }
};

exports.addTeacher = async (req, res) => {
  const success = await Teacher.create({
    name: {
      first: req.body.first_name,
      last: req.body.last_name,
    },
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address,
    phone: req.body.phone,
    subject: req.body.subject,
    grade: req.body.grade,
    school: req.body.school,
  });
  if (success) {
    res.send("Successfully added");
  } else {
    res.send("Failed to add a student");
  }
};

exports.seeComplain = async (req, res) => {
  const complain = await Complain.find();
  res.render("seeComplain", { complaints: complain });
};
