const Boulder = require("../models/boulder");
const User = require("../models/user");
const CompletedBoulder = require("../models/completed_boulders");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const { getActualEvent } = require("../utils/getActualEvent");

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

  const event = await getActualEvent();

  const boulder_path = await Boulder.findOne({ route: path }).lean();

  const submissions = await CompletedBoulder.find({
    boulder: boulder_path._id,
    witness: null,
  })
    .populate("climber", "username")
    .populate("boulder");

  return res.status(200).json({
    message: `Succesfully got ${path}`,
    path: { ...boulder_path, event: event },
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

  const witness = await User.findOne({
    _id: witnessId,
  });

  if (!witness) {
    const error = new Error();
    error.message = "Witness does not exist";
    error.statusCode = 404;
    return next(error);
  }

  if (completed_boulder) {
    const witnesses = completed_boulder.witnesses;
    for (const witness_temp of witnesses) {
      if (witness_temp.witness.toString() == witness._id.toString()) {
        const error = new Error();
        error.message = "You already requested this witness";
        error.statusCode = 403;
        return next(error);
      }
    }
    completed_boulder.witnesses.push({ accepted: false, witness: witness._id });

    await completed_boulder.save();

    return res.status(200).json({
      message: "Succesfully requested new witness",
    });
  }

  completed_boulder = await CompletedBoulder.create({
    climber: userId,
    witnesses: { accepted: false, witness: witness._id },
    boulder: path_id,
  });

  await completed_boulder.save();

  return res.status(200).json({
    message: "Succesfully sent witness request",
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
    error.message = "We can't find this submission";
    error.statusCode = 404;
    return next(error);
  }
  if (completed_boulder.witness != null) {
    const error = new Error();
    error.message = "This submission has a witness already";
    error.statusCode = 403;
    return next(error);
  }
  if (completed_boulder.climber == userId) {
    const error = new Error();
    error.message = "You can't be witness for your own submission";
    error.statusCode = 403;
    return next(error);
  }

  completed_boulder.witness = userId;
  await completed_boulder.save();

  return res.status(200).json({
    message: "Succesfully confirmed your witness",
  });
};

module.exports.getRequests = async (req, res, next) => {
  const userId = req.userId;
  const completed_boulders = await CompletedBoulder.find()
    .populate("boulder")
    .populate("climber", "username");

  const data = [];

  for (const completed_boulder of completed_boulders) {
    completed_boulder.witnesses.map((witness) => {
      if (witness.witness == userId && !witness.accepted) {
        data.push({ ...completed_boulder._doc });
      }
    });
  }

  return res.status(200).json({
    requests: data,
  });
};

module.exports.acceptRequest = async (req, res, next) => {
  const userId = req.userId;
  const completedBoulderId = req.params.completedBoulderId;

  const completed_boulder = await CompletedBoulder.findOne({
    _id: completedBoulderId,
  });

  let temp_index = null;

  for (const [index, witness] of completed_boulder.witnesses.entries()) {
    if (witness.witness == userId && !witness.accepted) {
      temp_index = index;
    }
  }
  // console.log(temp_index);

  completed_boulder.witnesses[temp_index].accepted = true;
  const witnesses = completed_boulder.witnesses[temp_index];

  await CompletedBoulder.updateOne(
    {
      _id: completed_boulder._id,
    },
    {
      witnesses: witnesses,
    }
  );

  return this.getRequests(req, res, next);
  // return res.status(200).json({
  //   message: "Succesfully accepted request",
  // });
};

module.exports.denyRequest = async (req, res, next) => {
  const userId = req.userId;
  const completedBoulderId = req.params.completedBoulderId;

  const completed_boulder = await CompletedBoulder.findOne({
    _id: completedBoulderId,
  });
  let temp_index = null;

  for (const [index, witness] of completed_boulder.witnesses.entries()) {
    if (witness.witness == userId && !witness.accepted) {
      temp_index = index;
    }
  }
  completed_boulder.witnesses.splice(temp_index, 1);
  await completed_boulder.save();

  return this.getRequests(req, res, next);
  // return res.status(200).json({
  //   message: "Succesfully denied request",
  // });
  // const witnesses = completed_boulder.witnesses[temp_index];
};

module.exports.getCompletedClimbs = async (req, res, next) => {
  const userId = req.userId;
  const completed_boulders = await CompletedBoulder.find({
    climber: userId,
  })
    .populate("climber", "username")
    .populate("boulder");

  for (const [index, completed_boulder] of completed_boulders.entries()) {
    for (const [index2, witness] of completed_boulder.witnesses.entries()) {
      const user = await User.findOne({
        _id: witness.witness,
      });
      completed_boulders[index].witnesses[index2].witness = {
        _id: user._id,
        username: user.username,
      };
    }
  }

  return res.status(200).json({
    completedBoulders: completed_boulders,
  });
};

module.exports.getAllBoulders = async (req, res, next) => {
  const boulders = await Boulder.find();

  const locations = {};

  for (const boulder of boulders) {
    try {
      locations[boulder.location].routes.push(boulder.route);
    } catch (err) {
      locations[boulder.location] = {
        routes: [],
        latitude: null,
        longitude: null,
      };
    }
    locations[boulder.location].latitude = boulder.latitude;
    locations[boulder.location].longitude = boulder.longitude;
  }

  var result = Object.keys(locations).map((key) => {
    return { ...locations[key], Boulder: key.split(">")[0].trim() };
  });

  return res.status(200).json({
    boulders: result,
  });
};
