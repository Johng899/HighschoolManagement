const { mongoose } = require("mongoose");
const { type } = require("os");

const teacherSchema = new mongoose.Schema({
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
  subject: String,
  grade: Number,
  school: {
    type: String,
    default: "Nafyad",
  },
});

const Teacher = new mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
