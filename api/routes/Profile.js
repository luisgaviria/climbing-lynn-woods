const router = require("express").Router();
const profileController = require("../controllers/profile");
const { isAuth } = require("../middleware/isAuth");

router.get("/", isAuth, profileController.getInfoAboutMyProfile);

router.patch("/", isAuth, profileController.editProfile);

module.exports = router;
