const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

// Get all data
router.get("/data", dataController.getData);

// Add new item
router.post("/data", dataController.addData);

// Update item
router.put("/data/:id", dataController.updateData);

// Delete item
router.delete("/data/:id", dataController.deleteData);

module.exports = router;
