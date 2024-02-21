const { mongoose } = require("mongoose");
const { type } = require("os");

const adminSchema = new mongoose.Schema({
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
  school: {
    type: String,
    default: "Nafyad",
  },
});

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = { Admin };
