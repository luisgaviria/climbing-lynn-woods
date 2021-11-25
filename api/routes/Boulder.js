const router = require("express").Router();
const boulderController = require("../controllers/boulder");
const { isAuth } = require("../middleware/isAuth");

router.post("/boulder", boulderController.AddBouldersFromFile);

router.get("/scrap", boulderController.scrapDataFromWebsites);

router.get("/rocks", boulderController.getAreasAndBoulders);

router.get("/rocks/:boulder", boulderController.getBoulderAndPaths);

router.get("/path/:path", boulderController.getPath);

router.post("/path/:path_id/finish", isAuth, boulderController.completeBoulder);

router.post(
  "/submission/:submissionId/accept",
  isAuth,
  boulderController.confirmSubmission
);

router.get("/requests", isAuth, boulderController.getRequests);

router.patch(
  "/request/:completedBoulderId",
  isAuth,
  boulderController.acceptRequest
);

router.delete(
  "/request/:completedBoulderId",
  isAuth,
  boulderController.denyRequest
);

router.get("/completed_climbs", isAuth, boulderController.getCompletedClimbs);

router.get("/boulders", isAuth, boulderController.getAllBoulders);

module.exports = router;
