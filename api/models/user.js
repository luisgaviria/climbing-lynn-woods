const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
    // required: true,
  },
  bio: {
    type: String,
    default: "",
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
    enum: ["Male", "Female", null],
  },
  category: {
    type: String,
    // required: true,
    enum: ["Beginner", "Intermediate", "Advance", null], // null => not competitor
  },
});

module.exports = mongoose.model("User", userSchema);
