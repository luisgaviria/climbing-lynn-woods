const mongoose = require("mongoose");

const completedBouldersSchema = new mongoose.Schema({
  climber: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  witnesses: { type: mongoose.Schema.Types.Array },
  boulder: { type: mongoose.Schema.Types.ObjectId, ref: "Boulder" },
});

module.exports = mongoose.model("CompletedBoulders", completedBouldersSchema);
