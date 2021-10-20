const mongoose = require("mongoose");

const boulderSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  avgStars: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Boulder", boulderSchema);
