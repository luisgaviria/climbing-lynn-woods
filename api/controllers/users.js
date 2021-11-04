const User = require("../models/user");

module.exports.getUsers = async (req, res, next) => {
  const username = req.params.username;

  const users = await User.find({ username: { $regex: username } }).select(
    "username"
  );

  return res.status(200).json({
    users: users,
  });
};
