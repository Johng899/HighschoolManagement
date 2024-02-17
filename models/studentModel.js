const { mongoose } = require("mongoose");
const { type } = require("os");

const studentSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  username: String,
  password: String,
  gender: String,
  dob: Date,
  address: String,
  phone: String,
  emergency: {
    name: String,
    phone: String,
  },
  subjects: [],
  rollNum: Number,
  grade: Number,
  school: {
    type: String,
    default: "Nafyad",
  },
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = { Student };
