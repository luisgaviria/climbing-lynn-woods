const router = require("express").Router();
const { isAuth } = require("../middleware/isAuth");
const UsersController = require("../controllers/users");

router.get("/:username", isAuth, UsersController.getUsers);

module.exports = router;
