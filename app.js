const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const studentRoutes = require("./routes/studentRoutes");
const { Student } = require("./models/studentModel");
const session = require("express-session");
const { Complain } = require("./models/complainModel");

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
