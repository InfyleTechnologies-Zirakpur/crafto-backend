// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");

// const {
//   getBirthdays,
//   createBirthday,
//   updateBirthday,
//   deleteBirthday
// } = require("../controllers/birthdayController");

// router.get("/", getBirthdays);

// router.post(
//   "/",
//   upload.fields([
//     { name: "photo", maxCount: 1 },
//     { name: "banner", maxCount: 1 }
//   ]),
//   createBirthday
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "photo", maxCount: 1 },
//     { name: "banner", maxCount: 1 }
//   ]),
//   updateBirthday
// );

// router.delete("/:id", deleteBirthday);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  getBirthdays,
  createBirthday,
  updateBirthday,
  deleteBirthday,
} = require("../controllers/birthdayController");

/* =====================================================
   CLOUDINARY STORAGE
   - photo  → image OR video
   - banner → image only
===================================================== */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder:
      file.fieldname === "photo"
        ? "birthdays/photo"
        : "birthdays/banner",

    resource_type: file.mimetype.startsWith("video")
      ? "video"
      : "image",
  }),
});

const upload = multer({ storage });

/* =====================================================
   ROUTES
===================================================== */

// GET
router.get("/", getBirthdays);

// CREATE
router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },   // 🔥 image / video
    { name: "banner", maxCount: 1 },  // 🔥 image only
  ]),
  createBirthday
);

// UPDATE
router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },   // 🔥 image / video
    { name: "banner", maxCount: 1 },  // 🔥 image only
  ]),
  updateBirthday
);

// DELETE
router.delete("/:id", deleteBirthday);

module.exports = router;
