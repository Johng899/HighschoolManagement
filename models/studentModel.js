const { mongoose } = require("mongoose");

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
  emergency_contact: String,
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = { Student };
