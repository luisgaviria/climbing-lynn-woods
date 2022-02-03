const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
