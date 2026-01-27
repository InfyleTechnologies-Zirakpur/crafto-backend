// // routes/reportsRoutes.js
// const express = require("express");
// const router = express.Router();
// const { createReport, getAllReports } = require("../controllers/reportsController");

// router.post("/", createReport);
// router.get("/", getAllReports);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createReport,
  getAllReports,
  updateReport,
  deleteReport,
} = require("../controllers/reportsController");

router.post("/", createReport);
router.get("/", getAllReports);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

module.exports = router;
