const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

const boulderRoute = require("./routes/Boulder");
const authRoute = require("./routes/Auth");

app.use(bodyParser.json());

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile, "Accepted");
    }
  )
);

app.use("/", boulderRoute);

app.use("/auth", authRoute);

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

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
