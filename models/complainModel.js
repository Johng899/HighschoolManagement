const { mongoose } = require("mongoose");

const complainSchema = new mongoose.Schema({
  class: Number,
  rollNum: Number,
  complain: String,
});

const Complain = new mongoose.model("Complain", complainSchema);

module.exports = { Complain };
