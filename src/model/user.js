// importing required libraries
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
  },
  cookie: {
    type: String,
    required: true
  }
});

// User model
const User = mongoose.model("users", userSchema);
// exporting model to use in other files
module.exports = User;
