const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const fileUpload = require("express-fileupload");
const { translateRating } = require("./utils/translateRating");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

const boulderRoute = require("./routes/Boulder");
const authRoute = require("./routes/Auth");
const usersRoute = require("./routes/Users");
const adminRoute = require("./routes/Admin");

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use((req, res, next) => {
  //cors policy
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, Authorization"
  );
  next();
});

app.use(express.static(path.resolve(__dirname, "../client/lynnwoods/build")));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile, "Accepted");
    }
  )
);

app.use(express.static(path.resolve(__dirname, "data")));

app.use("/api", boulderRoute);

app.use("/api/auth", authRoute);

app.use("/api/users", usersRoute);

app.use("/api/admin", adminRoute);

app.get("/client", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../client/lynnwoods/build", "index.html")
  );
});

app.use((error, req, res, next) => {
  // console.log(error);
  console.log(error);
  // console.log(error.message.toString());
  return res.status(error.statusCode).json({
    message: error.message,
  });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (result) => {
    console.log("Succesfully connected");
    translateRating();

    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
