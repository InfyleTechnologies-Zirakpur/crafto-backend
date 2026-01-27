// routes/creationRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  createCreation,
  getCreations,
  deleteCreation,
} = require("../controllers/creationController");

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "my_creations",
    resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    // optionally transformations: e.g. for images: width, crop...
    allowed_formats: ["jpg","jpeg","png","webp","mp4","mov","mkv"],
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 60 * 1024 * 1024, // 60 MB limit - adjust as needed
  },
});

// NOTE: add auth middleware. Example: router.use(authMiddleware)
const authMiddleware = (req, res, next) => {
  // Placeholder: set req.user from token/session
  // In real app, validate JWT and set req.user = { _id: ... }
  // For testing, allow query param ?user=USER_ID to simulate
  if (req.query.user) req.user = { _id: req.query.user };
  if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized. Provide ?user=USER_ID in dev." });
  return next();
};

router.post("/", authMiddleware, upload.single("file"), createCreation);
router.get("/", authMiddleware, getCreations);
router.delete("/:id", authMiddleware, deleteCreation);

module.exports = router;

