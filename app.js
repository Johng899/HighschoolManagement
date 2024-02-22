const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const studentController = require("./controllers/studentController"); // Import the student controller
const teacherController = require("./controllers/teacherController"); // Import the teacher controller
const adminController = require("./controllers/adminController");
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
app.get("/studentProfile", studentController.profile);
// Set up a default route for rendering the student dashboard
app.get("/students", (req, res) => {
  res.render("studentView");
});

// student login post form
app.post("/students", studentController.login);

app.get("/studentDashboard", studentController.sDashboard);

// Assignment View

app.get("/studentAssignment", studentController.sAssignment);

// assignment download

// app.js
app.get("/studentSubject", studentController.sSubject);

//Complain

app.get("/studentComplain", studentController.sComplain);

app.post("/studentComplain", studentController.sPComplain);

app.get("/logout", studentController.sLogout);

//Teacher

app.get("/teachers", (req, res) => {
  res.render("teacherView");
});

// teachers login post form
app.post("/teachers", teacherController.login);

// Teachers Dashboard

app.get("/teacherDashboard", teacherController.dashboard);

// Teachers Profile
app.get("/teacherProfile", teacherController.profile);

// Teacher complain

app.get("/teacherComplain", teacherController.tComplain);

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

//
app.post("/teacherComplain");

app.post(
  "/teacherAssignment",
  upload.single("pdf"),
  teacherController.Passignment
);
// Teacher Assignment

app.get("/teacherAssignment", teacherController.Gassignment);

//Admin
app.get("/admin", async (req, res) => {
  res.render("adminView");
});

// teachers login post form
app.post("/admin", adminController.admin);

//Add student
app.get("/addStudent", (req, res) => {
  res.render("addStudent");
});

app.post("/addStudent", adminController.addStudent);

// Teacher register
app.get("/addTeacher", (req, res) => {
  res.render("addTeacher");
});

app.post("/addTeacher", adminController.addTeacher);

// See complaints
app.get("/seeComplain", adminController.seeComplain);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
