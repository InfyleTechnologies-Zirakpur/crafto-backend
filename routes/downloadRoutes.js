// const express = require("express");
// const router = express.Router();
// const {
//   addDownload,
//   getDownloads,
//   deleteDownload,
// } = require("../controllers/downloadController");

// router.post("/", addDownload);
// router.get("/", getDownloads);
// router.delete("/:id", deleteDownload);

// module.exports = router;
const express = require("express");
const router = express.Router();

// 🔐 Auth middlewares
const { protect, admin } = require("../middleware/authMiddleware");

// 🎯 Controllers
const {
  addDownload,
  getDownloads,
  getMyDownloads,
  deleteDownload,
} = require("../controllers/downloadController");

/* =====================================================
   👤 USER ROUTES
===================================================== */

// ✅ User add download (JWT required)
router.post("/", protect, addDownload);

// ✅ User get ONLY his own downloads
router.get("/my", protect, getMyDownloads);


/* =====================================================
   👑 ADMIN ROUTES
===================================================== */

// ✅ Admin get ALL downloads
router.get("/", protect, admin, getDownloads);

// ✅ Admin delete any download
router.delete("/:id", protect, admin, deleteDownload);

module.exports = router;
