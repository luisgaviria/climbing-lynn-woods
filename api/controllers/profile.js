const User = require("../models/user");
const CompletedBoulders = require("../models/completed_boulders");

module.exports.getInfoAboutMyProfile = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findOne({
    _id: userId,
  });
  const completedBoulders = await CompletedBoulders.find({
    climber: userId,
  }).populate("boulder");

  const response = {
    climber: {
      username: user.username,
      id: user._id,
      gender: user.gender,
      category: user.category,
      bio: user.bio,
      image: user.image,
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

module.exports.editProfile = async (req, res, next) => {
  const userId = req.userId;
  const body = req.body;
  const user = await User.findOne({
    _id: userId,
  });

  const photo = req.files?.file;

  if (photo) {
    let url =
      "./data/user_photos/" +
      user.username +
      "." +
      photo.mimetype.split("/")[1];
    await photo.mv(url);
    user.image = url.split("./data")[1];
  }

  user.gender = body.gender;
  user.category = body.category;
  user.bio = body.bio;
  await user.save();
  return res.status(200).json({
    message: "Succesfully edited profile",
  });
};
