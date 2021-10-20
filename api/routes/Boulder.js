const router = require("express").Router();
const boulderController = require("../controllers/boulder");

router.post("/boulder", boulderController.AddBouldersFromFile);

module.exports = router;
