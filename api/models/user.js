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
  requests: {
    type: Array,
    required: true,
    ref: "CompletedBoulders",
  },
});

module.exports = mongoose.model("User", userSchema);
