const { Teacher } = require("../models/teacherModel");
const { Complain } = require("../models/complainModel");
const { Assignment } = require("../models/assignment");

exports.login = async (req, res) => {
  const usernameInput = req.body.email;
  const passwordInput = req.body.password;
  const result = await Teacher.findOne({ username: usernameInput });

  if (result) {
    if (result.password == passwordInput) {
      req.session.studentId = result._id; // Store user ID in the session
      res.render("teacherDashboard", {
        teacherName: result.name.first + " " + result.name.last,
        result: result,
      });
    } else {
      console.log("wrong password");
    }
  } else {
    console.log("no such user sorry (:");
  }
};

exports.dashboard = async (req, res) => {
  const result = await Teacher.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("teacherDashboard", {
      teacherName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    // Redirect to the login page or handle unauthorized access
    res.redirect("/teachers"); // Adjust the route accordingly
  }
};

exports.profile = async (req, res) => {
  const result = await Teacher.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("teacherProfile", {
      teacherName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    res.redirect("/teachers"); // Adjust the route accordingly
  }
};

exports.tComplain = async (req, res) => {
  const result = await Teacher.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("teacherComplain", {
      teacherName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    // Redirect to the login page or handle unauthorized access
    res.redirect("/teachers"); // Adjust the route accordingly
  }
};

exports.tPComplain = async (req, res) => {
  const grade = req.body.class;
  const rollNum = req.body.rollNum;
  const complain = req.body.complain;
  const currentDate = new Date();
  const success = await Complain.collection.insertOne({
    class: grade,
    rollNum: rollNum,
    complain: complain,
    type: "Teacher",
    date: currentDate,
  });
  if (success) {
    res.send("Success");
  } else {
    res.send("failed!");
  }
};

exports.Passignment = async (req, res) => {
  console.log(req.body, req.file);
  const filePath = req.file.path;

  // Generate a download link for the uploaded file
  const downloadLink = `${req.protocol}://${req.get("host")}/${filePath}`;
  try {
    const title = req.body.title;
    const description = req.body.description;
    const grade = Number(req.body.grade);
    const pdfUrl = downloadLink;
    console.log(title, description, pdfUrl);
    const success = await Assignment.collection.insertOne({
      title: title,
      description: description,
      pdfUrl: pdfUrl,
      grade: grade,
    });
    if (success) {
      res.redirect("/teacherDashboard");
    } else {
      res.send("failed!");
    }
  } catch (err) {
    res.send("Error adding assignment:");
  }
};

exports.Gassignment = async (req, res) => {
  const result = await Teacher.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("teacherAssignment", {
      teacherName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    // Redirect to the login page or handle unauthorized access
    res.redirect("/teachers"); // Adjust the route accordingly
  }
};
