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

  user.gender = body.gender;
  user.category = body.category;
  await user.save();

  return res.status(200).json({
    message: "Succesfully edited profile",
  });
};
