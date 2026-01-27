// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   createPoliticianPost,
//   getPostsByPolitician,
//     getAllPoliticianPosts,
// } = require("../controllers/politicianPostController");

// /* ========= MULTER + CLOUDINARY ========= */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isVideo = file.mimetype.startsWith("video");
//     return {
//       folder: "politician_posts",
//       resource_type: isVideo ? "video" : "image",
//       format: isVideo ? "mp4" : "webp",
//       public_id: `politician_post_${Date.now()}`,
//     };
//   },
// });

// const upload = multer({ storage });

// /* ========= ROUTES ========= */
// router.get("/", protect, getAllPoliticianPosts);

// // ✅ CREATE POST (image / video)
// router.post(
//   "/",
//   protect,
//   upload.single("media"),
//   createPoliticianPost
// );

// // 🌍 GET POSTS BY POLITICIAN
// router.get("/politician/:id", getPostsByPolitician);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  createPoliticianPost,
  getPostsByPolitician,
  getAllPoliticianPosts,
  updatePoliticianPost,
  deletePoliticianPost,
} = require("../controllers/politicianPostController");

/* ========= MULTER + CLOUDINARY ========= */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");
    return {
      folder: "politician_posts",
      resource_type: isVideo ? "video" : "image",
      format: isVideo ? "mp4" : "webp",
      public_id: `politician_post_${Date.now()}`,
    };
  },
});

const upload = multer({ storage });

/* ========= ROUTES ========= */

// 🔐 ADMIN – GET ALL POSTS
router.get("/", protect, getAllPoliticianPosts);
router.get("/all", getAllPoliticianPosts);

// 🔐 ADMIN – CREATE POST
router.post("/", protect, upload.single("media"), createPoliticianPost);

// 🌍 PUBLIC – GET POSTS BY POLITICIAN
router.get("/politician/:id", getPostsByPolitician);

// 🔐 ADMIN – UPDATE POST
router.put("/:id", protect, upload.single("media"), updatePoliticianPost);

// 🔐 ADMIN – DELETE POST
router.delete("/:id", protect, deletePoliticianPost);

module.exports = router;
