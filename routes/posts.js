const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const controller = require("../controllers/postController");

/* =========================================
   CLOUDINARY STORAGE
========================================= */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder:
        file.fieldname === "media"
          ? "posts/media"
          : "posts/banner",

      resource_type: file.mimetype.startsWith("video")
        ? "video"
        : "image",
    };
  },
});

const upload = multer({ storage });

/* =========================================
   ROUTES
========================================= */

// GET ALL POSTS (ADMIN / APP)
router.get("/", controller.getPosts);

// CREATE POST
router.post(
  "/",
  upload.fields([
    { name: "media", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  controller.createPost
);

// UPDATE POST
router.put(
  "/:id",
  upload.fields([
    { name: "media", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  controller.updatePost
);

// DELETE POST
router.delete("/:id", controller.deletePost);

module.exports = router;
