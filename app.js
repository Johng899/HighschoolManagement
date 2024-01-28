const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const studentRoutes = require("./routes/studentRoutes");
const { Student } = require("./models/studentModel");

const app = express();

app.set("view engine", "ejs");

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
app.get("/studentProfile", (req, res) => {
  res.render("studentProfile");
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
      res.render("studentDashboard", {
        studentName: result.name.first + " " + result.name.last,
      });
      //render here
    } else {
      console.log("wrong password");
    }
  } else {
    console.log("no such user sorry (:");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
