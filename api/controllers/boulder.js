const Boulder = require("../models/boulder");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const cheerio = require("cheerio");

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

module.exports.scrapDataFromWebsites = async (req, res, next) => {
  // need to improve this to make data for all
  const boulders = await Boulder.find();

  for (const boulder of boulders) {
    const response = await axios.get(boulder.url);
    const $ = cheerio.load(response.data);
    const description = $(".fr-view").text().trim();
    const FA = $(
      "#route-page > div > div.col-md-9.main-content.float-md-right > div.row > div.col-lg-7.col-md-6 > div.small.mb-1 > table > tbody > tr:nth-child(2) > td:nth-child(2)"
    ).text();
    // const photos = [];
    // $(
    //   "#route-page > div > div.col-md-9.main-content.float-md-right > div:nth-child(2) > div > div"
    // )
    //   .toArray()
    //   .map((div) => {
    //     console.log($(div).find("img").attr("src"));
    //   });
    // console.log(description);
    // console.log(FA);
    // const photos ?
  }
  // const response = await axios.get(boulder[0].url);
  // const $ = cheerio.load(response.data);
};

module.exports.getAreasAndBoulders = async (req, res, next) => {
  const boulders = await Boulder.find();
  let areas = [];

  boulders.map((boulder) => {
    areas.push(boulder.location.split("> ")[1]);
  });

  let response = {};

  areas = [...new Set(areas)];

  areas.map((area) => {
    response = { ...response, [area]: [] };
  });

  areas.map((area) => {
    boulders.map((boulder) => {
      if (boulder.location.split("> ")[1] == area) {
        response[area].push(boulder.location.split(" >")[0]);
      }
    });
  });

  const keys = Object.keys(response);
  keys.map((key) => {
    response[key] = [...new Set(response[key])];
  });

  return res.status(200).json({
    message: "Succesfully got areas",
    rocks: response,
  });
};

module.exports.getBoulderAndPaths = async (req, res, next) => {
  const boulder = req.params.boulder;

  const paths = await Boulder.find({ location: { $regex: boulder } });

  return res.status(200).json({
    message: `Succesfully got paths for ${boulder}`,
    paths: paths,
  });
};
