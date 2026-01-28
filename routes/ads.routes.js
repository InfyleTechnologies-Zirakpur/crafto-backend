// const router = require("express").Router();
// const upload = require("../middleware/upload");
// const { protect, admin } = require("../middleware/authMiddleware");
// const ctrl = require("../controllers/ads.controller");

// // ================= CREATE AD (ADMIN) =================
// router.post(
//   "/",
//   protect,
//   admin,
//   upload.single("file"),
//   ctrl.createAd
// );

// // ================= GET ALL ADS (ADMIN) =================
// router.get(
//   "/",
//   protect,
//   admin,
//   ctrl.getAds
// );

// // ================= GET ACTIVE ADS (APP / PUBLIC) =================
// // 🔓 NO AUTH REQUIRED
// router.get(
//   "/public",
//   ctrl.getActiveAds
// );

// // ================= UPDATE AD (ADMIN) =================
// router.put(
//   "/:id",
//   protect,
//   admin,
//   upload.single("file"),
//   ctrl.updateAd
// );

// // ================= TOGGLE STATUS (ADMIN) =================
// router.put(
//   "/toggle/:id",
//   protect,
//   admin,
//   ctrl.toggleStatus
// );

// // ================= DELETE AD (ADMIN) =================
// router.delete(
//   "/:id",
//   protect,
//   admin,
//   ctrl.deleteAd
// );

// module.exports = router;


const router = require("express").Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { protect, admin } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/ads.controller");

/* ================================
   📤 CLOUDINARY STORAGE (INLINE)
================================ */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder:
      file.fieldname === "file"
        ? "crafto/ads"
        : "crafto/ads/banners",
    resource_type: file.mimetype.startsWith("video")
      ? "video"
      : "image",
  }),
});

const upload = multer({ storage });

const adsUpload = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "banners", maxCount: 5 },
]);

// ================= CREATE AD =================
router.post("/", protect, admin, adsUpload, ctrl.createAd);

// ================= GET ALL ADS =================
router.get("/", protect, admin, ctrl.getAds);

// ================= GET ACTIVE ADS =================
router.get("/public", ctrl.getActiveAds);

// ================= UPDATE AD =================
router.put("/:id", protect, admin, adsUpload, ctrl.updateAd);

// ================= TOGGLE STATUS =================
router.put("/toggle/:id", protect, admin, ctrl.toggleStatus);

// ================= DELETE AD =================
router.delete("/:id", protect, admin, ctrl.deleteAd);

module.exports = router;

