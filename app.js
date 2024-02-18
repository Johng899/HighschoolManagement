const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const studentRoutes = require("./routes/studentRoutes");
const { Student } = require("./models/studentModel");
const { Teacher } = require("./models/teacherModel");
const session = require("express-session");
const { Complain } = require("./models/complainModel");
const { Assignment } = require("./models/assignment");
const multer = require("multer");
const path = require("path");
//
//
//

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key", // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
    console.log("connected successfully");
  } catch (error) {
    console.error("Error connecting mongoDB:", error);
  }
}

connectToDB();

// Serve static files (CSS, JS, etc.)
app.use(express.static("public"));

// home
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/studentProfile", async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    // User is authenticated, render the subject page
    res.render("studentProfile", {
      studentName: result.name.first + " " + result.name.last,
      result: result,
    });
  } else {
    res.redirect("/students"); // Adjust the route accordingly
  }
});
// Set up a default route for rendering the student dashboard
app.get("/students", (req, res) => {
  res.render("studentView");
});

// student login post form
app.post("/students", async (req, res) => {
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
});

app.get("/studentDashboard", async (req, res) => {
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
});

// Assignment View

app.get("/studentAssignment", async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  if (req.session.studentId) {
    const assignment = await Assignment.find({
      grade: result.grade,
    });
    console.log(assignment);
    res.render("studentAssignment", { assignments: assignment });
  } else {
    res.redirect("/students");
  }
});

// assignment download

// app.js
app.get("/studentSubject", async (req, res) => {
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
});

//Complain

app.get("/studentComplain", async (req, res) => {
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
});

app.post("/studentComplain", async (req, res) => {
  const grade = req.body.class;
  const rollNum = req.body.rollNum;
  const complain = req.body.complain;
  console.log(complain);
  const success = await Complain.collection.insertOne({
    class: grade,
    rollNum: rollNum,
    complain: complain,
    type: "Student",
  });
  if (success) {
    res.send("Success");
  } else {
    res.send("failed!");
  }
});

app.get("/logout", async (req, res) => {
  const result = await Student.findOne({ _id: req.session.studentId });
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/"); // Redirect to the login page after logout
    }
  });
});

//Teacher

app.get("/teachers", (req, res) => {
  res.render("teacherView");
});

// teachers login post form
app.post("/teachers", async (req, res) => {
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
});

// Teachers Dashboard

app.get("/teacherDashboard", async (req, res) => {
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
});

// Teachers Profile
app.get("/teacherProfile", async (req, res) => {
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
});

// Teacher complain

app.get("/teacherComplain", async (req, res) => {
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
});

// Set up Multer to save uploaded files to the public/docs folder
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/docs"); // Save files to the public/docs folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use original filename
    },
  }),
});

app.post("/teacherAssignment", upload.single("pdf"), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const { title, description, grade } = req.body;
    const pdfUrl = `${req.protocol}://${req.get("host")}/docs/${
      req.file.originalname
    }`; // Construct the pdfUrl

    // Add assignment to the database
    const assignment = new Assignment({
      title: title,
      description: description,
      pdfUrl: pdfUrl,
      grade: parseInt(grade),
    });

    await assignment.save();

    res.redirect("/teacherDashboard");
  } catch (err) {
    console.error("Error adding assignment:", err);
    res.status(500).send("Error adding assignment");
  }
});
// Teacher Assignment

app.get("/teacherAssignment", async (req, res) => {
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
});

//post assignment

app.post("/teacherAssignment", upload.single("pdf"), async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
