const Boulder = require("../models/boulder");
const User = require("../models/user");
const CompletedBoulder = require("../models/completed_boulders");
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
    try {
      const response = await axios.get(boulder.url);
      const $ = cheerio.load(response.data);
      const description = $(".fr-view").text().trim();
      const FA = $(
        "#route-page > div > div.col-md-9.main-content.float-md-right > div.row > div.col-lg-7.col-md-6 > div.small.mb-1 > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ).text();
      const photos = [];
      const divs = $(
        "#route-page > div > div.col-md-9.main-content.float-md-right > div:nth-child(2) > div"
      )
        .find("div.col-xs-4.col-lg-3.card-with-photo")
        .toArray();
      divs.map((div) => {
        photos.push($(div).find("img.lazy").attr("data-src"));
      });

      boulder.photos = photos;
      boulder.description = description;
      boulder.FA = FA.trim();
      console.log(photos);
      console.log(description);
      await boulder.save();
    } catch (err) {
      console.log(err);
    }
  }

  return res.status(200).json({
    message: "Succesfully scrapped all data from site",
  });
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

module.exports.getPath = async (req, res, next) => {
  const path = req.params.path;

  const boulder_path = await Boulder.findOne({ route: path });

  const submissions = await CompletedBoulder.find({
    boulder: boulder_path._id,
    witness: null,
  })
    .populate("climber", "username")
    .populate("boulder");

  return res.status(200).json({
    message: `Succesfully got ${path}`,
    path: boulder_path,
    submissions: submissions,
  });
};

module.exports.completeBoulder = async (req, res, next) => {
  const userId = req.userId;
  const witnessId = req.body.witnessId;
  const path_id = req.params.path_id;

  let completed_boulder = await CompletedBoulder.findOne({
    climber: userId,
    boulder: path_id,
  });

  if (completed_boulder) {
    const error = new Error();
    error.message = "You already done this boulder";
    error.statusCode = 403;
    return next(error);
  }

  const witness = await User.findOne({
    _id: witnessId,
  });

  completed_boulder = await CompletedBoulder.create({
    climber: userId,
    witness: null,
    boulder: path_id,
  });

  witness.requests.push(completed_boulder._id.toString());

  await witness.save();

  await completed_boulder.save();

  return res.status(200).json({
    message: "Created submission to confirm by witness",
  });
};

module.exports.confirmSubmission = async (req, res, next) => {
  const userId = req.userId;
  const submissionId = req.params.submissionId;

  const completed_boulder = await CompletedBoulder.findOne({
    _id: submissionId,
  });

  if (!completed_boulder) {
    const error = new Error();
    error.message = "We can't find submission";
    error.statusCode = 404;
    return next(error);
  }
  if (completed_boulder.witness != null) {
    const error = new Error();
    error.message = "This submission have witness";
    error.statusCode = 403;
    return next(error);
  }
  if (completed_boulder.climber == userId) {
    const error = new Error();
    error.message = "You can't be witness for your submission";
    error.statusCode = 403;
    return next(error);
  }

  completed_boulder.witness = userId;
  await completed_boulder.save();

  return res.status(200).json({
    message: "Succesfully confirmed submission",
  });
};

module.exports.getRequests = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId }).populate("requests");

  console.log(user);
};
