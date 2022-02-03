const Event = require("../models/event");

module.exports.getActualEvent = async () => {
  const event = (
    await Event.find({ active: true }).sort({ number: -1 }).limit(1)
  )[0];
  return event;
};
