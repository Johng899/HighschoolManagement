const { Student } = require("../models/studentModel");
const { Complain } = require("../models/complainModel");
const { Assignment } = require("../models/assignment");

exports.profile = async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });

  if (req.session.studentId) {
    res.render("studentProfile", {
      studentName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    res.redirect("/students"); // Adjust the route accordingly
  }
};

exports.login = async (req, res) => {
  const usernameInput = req.body.email;
  const passwordInput = req.body.password;
  const result = await Student.findOne({ username: usernameInput });

  if (result) {
    if (result.password == passwordInput) {
      req.session.studentId = result._id; // Store user ID in the session
      res.render("studentDashboard", {
        studentName: result.name.first + " " + result.name.last,
        result: result,
      });
    } else {
      console.log("wrong password");
    }
  } else {
    console.log("no such user sorry (:");
  }
};

exports.sDashboard = async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("studentDashboard", {
      studentName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    // Redirect to the login page or handle unauthorized access
    res.redirect("/students"); // Adjust the route accordingly
  }
};

exports.sAssignment = async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    const assignment = await Assignment.find({
      grade: result.grade,
    });
    console.log(assignment);
    res.render("studentAssignment", {
      assignments: assignment,
      studentName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    res.redirect("/students");
  }
};

exports.sSubject = async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("studentSubject", {
      studentName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    // Redirect to the login page or handle unauthorized access
    res.redirect("/students"); // Adjust the route accordingly
  }
};

exports.sComplain = async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("studentComplain", {
      studentName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    // Redirect to the login page or handle unauthorized access
    res.redirect("/students"); // Adjust the route accordingly
  }
};

exports.sPComplain = async (req, res) => {
  const grade = req.body.class;
  const rollNum = req.body.rollNum;
  const complain = req.body.complain;
  const currentDate = new Date();
  const success = await Complain.collection.insertOne({
    class: grade,
    rollNum: rollNum,
    complain: complain,
    type: "Student",
    date: currentDate,
  });
  if (success) {
    res.send("Success");
  } else {
    res.send("failed!");
  }
};

exports.sLogout = async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/"); // Redirect to the login page after logout
    }
  });
};
