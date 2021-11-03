const router = require("express").Router();
const boulderController = require("../controllers/boulder");
const { isAuth } = require("../middleware/isAuth");

router.post("/boulder", boulderController.AddBouldersFromFile);

router.get("/scrap", boulderController.scrapDataFromWebsites);

router.get("/rocks", isAuth, boulderController.getAreasAndBoulders);

router.get("/rocks/:boulder", isAuth, boulderController.getBoulderAndPaths);

router.get("/path/:path", isAuth, boulderController.getPath);

router.post("/path/:path_id/finish", isAuth, boulderController.completeBoulder);

module.exports = router;
