const router = require("express").Router();
require("dotenv").config();
const adminController = require("../controllers/admin");
const { isAdmin } = require("../middleware/isAdmin");

router.post("/add", isAdmin, adminController.addAdmin);

router.patch("/path/:path_id", isAdmin, adminController.updatePath);

module.exports = router;