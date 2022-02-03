require("dotenv").config();
const Admin = require("../models/admin");
const Boulder = require("../models/boulder");
const CompletedBoulders = require("../models/completed_boulders");
const Event = require("../models/event");
const bcrypt = require("bcrypt");

module.exports.addAdmin = async (req, res, next) => {
  const body = req.body;

  if (!body.login.length || !body.password.length) {
    const error = new Error();
    error.message = "You need to specify login and password";
    error.statusCode = 404;
    return next(error);
  }

  const existingAccount = await Admin.findOne({
    login: body.login,
  });

  if (existingAccount) {
    const error = new Error();
    error.message = "Account already exists";
    error.statusCode = 403;
    return next(error);
  }

  const hashed_password = bcrypt.hashSync(body.password, 12);

  const admin = await Admin.create({
    login: body.login,
    password: hashed_password,
  });
  await admin.save();

  return res.status(201).json({
    admin: admin,
    message: "Succesfully created admin account",
  });
};

module.exports.updatePath = async (req, res, next) => {
  const pathId = req.params.path_id;
  const boulder = await Boulder.findOne({
    _id: pathId,
  });

  const photo = req.files.file;

  if (photo) {
    await photo.mv("./data/photos/" + photo.name);
  }

  if (!boulder) {
    const error = new Error();
    error.message = "We can't update path";
    error.statusCode = 400;
    return next(error);
  }

  const body = req.body;

  boulder.location = body.location;
  boulder.points = body.points;
  boulder.avgStars = body.avgStars;
  boulder.description = body.description;
  boulder.latitude = body.latitude;
  boulder.longitude = body.longitude;

  boulder.photos.push("/photos/" + photo.name);

  await boulder.save();

  return res.status(200).json({
    message: "Succesfully edited path",
  });
};

module.exports.getClimbers = async (req, res, next) => {
  const category = req.query.category;
  const completedBoulders = await CompletedBoulders.find().populate(
    "boulder climber"
  );

  const response = {};

  for (const completedBoulder of completedBoulders) {
    if (category == "all_categories") {
      response[completedBoulder.climber?._id.toString()] = {
        username: completedBoulder.climber?.username,
        points: 0,
        completed_boulders: [],
      };
    } else if (completedBoulder.climber.category == category) {
      response[completedBoulder.climber?._id.toString()] = {
        username: completedBoulder.climber?.username,
        points: 0,
        completed_boulders: [],
      };
    }
  }

  for (const completedBoulder of completedBoulders) {
    let temp = false;
    completedBoulder.witnesses.map((witness) => {
      if (witness.accepted) {
        temp = true;
      }
    });
    if (temp) {
      if (category == "all_categories") {
        response[completedBoulder.climber._id.toString()].points +=
          completedBoulder.boulder.points;
        response[
          completedBoulder.climber._id.toString()
        ].completed_boulders.push(completedBoulder.boulder);
      } else if (completedBoulder.climber.category == category) {
        response[completedBoulder.climber._id.toString()].points +=
          completedBoulder.boulder.points;
        response[
          completedBoulder.climber._id.toString()
        ].completed_boulders.push(completedBoulder.boulder);
      }
    }
  }

  res.status(200).json({
    response: response,
  });
};

module.exports.getCompletedClimbsForExactUser = async (req, res, next) => {
  const climberId = req.params.climberId;
  const completedBoulders = await CompletedBoulders.find({
    climber: climberId,
  }).populate("boulder climber");

  const response = {
    climber: {
      username: completedBoulders[0].climber.username,
      id: completedBoulders[0].climber._id,
      points: 0,
    },
    completed_boulders: [],
  };

  for (const completedBoulder of completedBoulders) {
    let temp = false;
    completedBoulder.witnesses.map((witness) => {
      if (witness.accepted) {
        temp = true;
      }
    });
    if (temp) {
      response.completed_boulders.push(completedBoulder.boulder);
      response.climber.points += completedBoulder.boulder.points;
    }
  }
  return res.status(200).json({
    response: response,
  });
};

module.exports.getEvent = async (req, res, next) => {
  const event = (
    await Event.find({ active: true }).sort({ number: -1 }).limit(1)
  )[0];
  return res.status(200).json({
    event: event,
  });
};

module.exports.activateEvent = async (req, res, next) => {
  const activated_events = await Event.find({ active: true });
  if (activated_events.length) {
    return res.status(400).json({
      message: "You already have activated event",
    });
  }
  const event = (await Event.find().sort({ number: -1 }).limit(1))[0];

  console.log(event);

  const newEvent = await Event.create({
    number: event.number + 1,
    active: true,
  });
  await newEvent.save();
  return res.status(200).json({
    message: `New Event ${newEvent.number} is Activated`,
  });
};

module.exports.deactivateEvent = async (req, res, next) => {
  const event = (await Event.find().sort({ number: -1 }).limit(1))[0];
  event.active = false;
  await event.save();
  return res.status(200).json({
    message: "Event is Deactivated",
  });
};
