const Boulder = require("../models/boulder");
const fs = require("fs");
const csv = require("csv-parser");

module.exports.AddBouldersFromFile = (req, res, next) => {
  // const results = [];
  fs.createReadStream("./data/route-finder.csv")
    .pipe(csv())
    .on("data", async (data) => {
      const temp = data.Location.split(">");
      const location = temp[0] + ">" + temp[1];
      const boulder = await Boulder.create({
        route: data.Route,
        location: location,
        url: data.URL,
        avgStars: data["Avg Stars"],
        rating: data.Rating,
        length: data.Length,
        latitude: data["Area Latitude"],
        longitude: data["Area Longitude"],
        points: 0,
      });
      await boulder.save();
    })
    .on("end", () => {
      res.json({
        message: "Added boulders!",
      });
    });
};
