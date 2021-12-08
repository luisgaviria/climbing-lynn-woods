const router = require("express").Router();
const authController = require("../controllers/auth");
const passport = require("passport");
require("dotenv").config();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", (req, res) => {
    res.redirect("/");
  }),
  authController.loginUserViaGoogle
);

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

module.exports = router;
