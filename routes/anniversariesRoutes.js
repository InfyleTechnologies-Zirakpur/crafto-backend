// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload');

// const controller = require('../controllers/anniversaryController');

// router.get('/', controller.getBirthdays);

// router.post('/', upload.fields([
//   { name: 'photo', maxCount: 1 },
//   { name: 'banner', maxCount: 1 }
// ]), controller.createBirthday);

// router.put('/:id', upload.fields([
//   { name: 'photo', maxCount: 1 },
//   { name: 'banner', maxCount: 1 }
// ]), controller.updateBirthday);

// router.delete('/:id', controller.deleteBirthday);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const controller = require("../controllers/anniversaryController");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder:
      file.fieldname === "media"
        ? "anniversaries/media"
        : "anniversaries/banner",
    resource_type: file.mimetype.startsWith("video") ? "video" : "image",
  }),
});

const upload = multer({ storage });

router.get("/", controller.getBirthdays);

router.post(
  "/",
  upload.fields([
    { name: "media", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  controller.createBirthday
);

router.put(
  "/:id",
  upload.fields([
    { name: "media", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  controller.updateBirthday
);

router.delete("/:id", controller.deleteBirthday);

module.exports = router;
