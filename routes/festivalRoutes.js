// const router = require("express").Router();
// const upload = require("../middleware/upload");

// const {
//   getFestivals,
//   createFestival,
//   updateFestival,
//   deleteFestival
// } = require("../controllers/festivalController");

// router.get("/", getFestivals);
// router.post("/", upload.single("logo"), createFestival);
// router.put("/:id", upload.single("logo"), updateFestival);
// router.delete("/:id", deleteFestival);

// module.exports = router;


// const router = require("express").Router();
// const upload = require("../middleware/upload");
// const {
//   getFestivals,
//   createFestival,
//   updateFestival,
//   deleteFestival
// } = require("../controllers/festivalController");

// router.get("/", getFestivals);
// router.post("/", upload.single("logo"), createFestival);
// router.put("/:id", upload.single("logo"), updateFestival);
// router.delete("/:id", deleteFestival);

// module.exports = router;

// const router = require("express").Router();
// const upload = require("../middleware/upload");

// const {
//   getFestivals,
//   createFestival,
//   updateFestival,
//   deleteFestival
// } = require("../controllers/festivalController");

// // ⭐ MULTIPLE UPLOADS (logo + banner)
// const multiUpload = upload.fields([
//   { name: "logo", maxCount: 1 },
//   { name: "banner", maxCount: 1 }
// ]);

// // 📌 GET Festivals
// router.get("/", getFestivals);

// // 📌 CREATE Festival (logo + banner allowed)
// router.post("/", multiUpload, createFestival);

// // 📌 UPDATE Festival (logo + banner allowed)
// router.put("/:id", multiUpload, updateFestival);

// // 📌 DELETE Festival
// router.delete("/:id", deleteFestival);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  getFestivals,
  createFestival,
  updateFestival,
  deleteFestival,
} = require("../controllers/festivalController");

/* =====================================================
   ☁️ CLOUDINARY STORAGE CONFIG
   - logo   → image OR video
   - banner → image only
===================================================== */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isLogo = file.fieldname === "logo";

    return {
      folder: isLogo
        ? "festivals/logo"
        : "festivals/banner",

      // 🔥 logo = image/video | banner = image
      resource_type: file.mimetype.startsWith("video")
        ? "video"
        : "image",
    };
  },
});

const upload = multer({ storage });

/* =====================================================
   🚀 ROUTES
===================================================== */

// ✅ GET festivals
router.get("/", getFestivals);

// ✅ CREATE festival (logo + banner)
router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },    // 🔥 image / video
    { name: "banner", maxCount: 1 },  // 🔥 image only
  ]),
  createFestival
);

// ✅ UPDATE festival (logo + banner)
router.put(
  "/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },    // 🔥 image / video
    { name: "banner", maxCount: 1 },  // 🔥 image only
  ]),
  updateFestival
);

// ✅ DELETE festival
router.delete("/:id", deleteFestival);

module.exports = router;
