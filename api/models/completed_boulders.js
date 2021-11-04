const mongoose = require("mongoose");

const completedBouldersSchema = new mongoose.Schema({
  climber: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  witness: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  boulder: { type: mongoose.Schema.Types.ObjectId, ref: "Boulder" },
});

module.exports = mongoose.model("CompletedBoulders", completedBouldersSchema);
