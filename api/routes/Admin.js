const router = require("express").Router();
require("dotenv").config();
const adminController = require("../controllers/admin");
const { isAdmin } = require("../middleware/isAdmin");

router.post("/add", isAdmin, adminController.addAdmin);

router.patch("/path/:path_id", isAdmin, adminController.updatePath);

router.get("/climbers", isAdmin, adminController.getClimbers);

router.get(
  "/completedClimbs/:climberId",
  isAdmin,
  adminController.getCompletedClimbsForExactUser
);

router.get("/event", isAdmin, adminController.getEvent);

router.patch("/event/activate", isAdmin, adminController.activateEvent);

router.patch("/event/deactivate", isAdmin, adminController.deactivateEvent);

module.exports = router;
