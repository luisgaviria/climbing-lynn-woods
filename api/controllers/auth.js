require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res, next) => {
  const body = req.body;

  if (!body.username.length || !body.email.length || !body.password.length) {
    const error = new Error();
    error.message = "You need to specify username, email and password";
    error.statusCode = 404;
    return next(error);
  }

  const existingAccount = await User.findOne({
    $or: [
      { username: body.username },
      {
        email: body.email,
      },
    ],
  });

  if (existingAccount) {
    const error = new Error();
    error.message = "Account already exists";
    error.statusCode = 403;
    next(error);
  }

  const hashed_password = bcrypt.hashSync(body.password, 12);

  const user = await User.create({ ...body, password: hashed_password });
  const token = await jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET,
    {}
  );
  await user.save();

  res.status(201).json({
    user: user,
    message: "Succesfully created account",
    token: token,
  });
};

module.exports.loginUser = async (req, res, next) => {
  const body = req.body;

  if (!body.login || !body.password) {
    const error = new Error();
    error.message = "You need to pass login and password";
    error.statusCode = 404;
    return next(error);
  }

  const user = await User.findOne({
    $or: [
      {
        username: body.login,
      },
      {
        email: body.login,
      },
    ],
  });

  if (!user) {
    const error = new Error();
    error.message = "Your login or password is wrong";
    error.statusCode = 401;
    return next(error);
  }

  const logged = bcrypt.compareSync(body.password, user.password);

  if (logged) {
    const token = await jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {}
    );
    return res.status(200).json({
      message: "Succesfully logged",
      token: token,
    });
  } else {
    const error = new Error();
    error.message = "Your login or password is wrong";
    error.statusCode = 401;
    return next(error);
  }
};

module.exports.loginUserViaGoogle = async (req, res, next) => {
  console.log(req.user);
  return res.send("Logged");
};
