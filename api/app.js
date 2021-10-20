const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const boulderRoute = require("./routes/Boulder");

app.use(bodyParser.json());

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

app.use("/", boulderRoute);

mongoose
  .connect(
    "mongodb+srv://lynnwoods:notlynnwoods@cluster0.r7wpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async (result) => {
    console.log("Succesfully connected");

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
