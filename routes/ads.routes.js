const router = require("express").Router();
const upload = require("../middleware/upload");
const { protect, admin } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/ads.controller");

// ================= CREATE AD (ADMIN) =================
router.post(
  "/",
  protect,
  admin,
  upload.single("file"),
  ctrl.createAd
);

// ================= GET ALL ADS (ADMIN) =================
router.get(
  "/",
  protect,
  admin,
  ctrl.getAds
);

// ================= GET ACTIVE ADS (APP / PUBLIC) =================
// 🔓 NO AUTH REQUIRED
router.get(
  "/public",
  ctrl.getActiveAds
);

// ================= UPDATE AD (ADMIN) =================
router.put(
  "/:id",
  protect,
  admin,
  upload.single("file"),
  ctrl.updateAd
);

// ================= TOGGLE STATUS (ADMIN) =================
router.put(
  "/toggle/:id",
  protect,
  admin,
  ctrl.toggleStatus
);

// ================= DELETE AD (ADMIN) =================
router.delete(
  "/:id",
  protect,
  admin,
  ctrl.deleteAd
);

module.exports = router;
