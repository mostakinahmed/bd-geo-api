const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.get("/divisions", locationController.getDivisions);
router.get("/districts", locationController.getDistricts);
router.get("/upazilas", locationController.getUpazilas);
router.get("/unions", locationController.getUnions);

module.exports = router;
