const Boulder = require("../models/boulder");

module.exports.translateRating = async () => {
  const boulders = await Boulder.find();

  for (const boulder of boulders) {
    let rating = boulder.rating;
    if (rating.length) {
      const r = /\d+/;
      const number = rating.match(r);
      if (number) {
        let points = parseInt(number[0]) * 100;
        if (number.input[number.index + 1] == "+") {
          points += 50;
        } else if (number.input[number.index + 1] == "-") {
          points -= 50;
        } else if (number[0] == "0") {
          points = 50;
        }
        boulder.points = points;
        await boulder.save();
      }
    }
  }
};
