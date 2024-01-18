const { mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  username: String,
  password: String,
  gender: String,
  approved: Boolean,
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = { Student };
