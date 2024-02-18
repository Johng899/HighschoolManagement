const { mongoose } = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  pdfUrl: String,
  grade: Number,
});

const Assignment = new mongoose.model("Assignment", assignmentSchema);

module.exports = { Assignment };
