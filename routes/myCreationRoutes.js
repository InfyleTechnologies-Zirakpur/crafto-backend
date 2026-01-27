// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("../config/cloudinary");

// // const {
// //   createMyCreation,
// //   getAllMyCreations,
// //   getApprovedCreations,
// //   updateStatus,
// //   deleteMyCreation,
// // } = require("../controllers/myCreationController");

// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: async (req, file) => ({
// //     folder: file.fieldname === "frameFile" ? "mycreations/frames" : "mycreations/files",
// //     resource_type: file.mimetype.includes("video") ? "video" : "image",
// //     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
// //   }),
// // });

// // const upload = multer({ storage });

// // // Routes
// // router.post("/", upload.fields([{ name: "file" }, { name: "frameFile" }]), createMyCreation);
// // router.get("/", getAllMyCreations); // Admin panel
// // router.get("/approved", getApprovedCreations); // Public approved list
// // router.put("/:id/status", updateStatus); // Admin approve/reject
// // router.delete("/:id", deleteMyCreation);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   createMyCreation,
//   getAllMyCreations,
//   deleteMyCreation,
// } = require("../controllers/myCreationController");

// /* ===============================
//    CLOUDINARY STORAGE
// ================================ */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "my_creations",
//     resource_type: file.mimetype.startsWith("video") ? "video" : "image",
//     allowed_formats: ["jpg","jpeg","png","webp","mp4","mov","mkv"],
//   }),
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 60 * 1024 * 1024 },
// });

// /* ===============================
//    AUTH (TEMP / DEV)
// ================================ */
// const authMiddleware = (req, res, next) => {
//   if (req.query.user) req.user = { _id: req.query.user };
//   if (!req.user)
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   next();
// };

// /* ===============================
//    ROUTES
// ================================ */
// router.post(
//   "/",
//   authMiddleware,
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 },
//   ]),
//   createMyCreation
// );

// router.get("/", authMiddleware, getAllMyCreations);

// router.delete("/:id", authMiddleware, deleteMyCreation);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   createMyCreation,
//   getAllMyCreations,
//   getApprovedCreations,
//   updateStatus,
//   deleteMyCreation,
// } = require("../controllers/myCreationController");

// /* ================= CLOUDINARY STORAGE ================= */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder:
//       file.fieldname === "frameFile"
//         ? "my_creations/frames"
//         : "my_creations/files",
//     resource_type: file.mimetype.startsWith("video") ? "video" : "image",
//     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
//   }),
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 60 * 1024 * 1024 },
// });

// /* ================= TEMP AUTH ================= */
// const authMiddleware = (req, res, next) => {
//   if (req.query.user) {
//     req.user = { _id: req.query.user };
//   }

//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }

//   next();
// };

// /* ================= ROUTES ================= */

// // CREATE (USER)
// router.post(
//   "/",
//   authMiddleware,
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 },
//   ]),
//   createMyCreation
// );

// // ADMIN LIST (NO AUTH ❗)
// router.get("/", getAllMyCreations);

// // PUBLIC APPROVED
// router.get("/approved", getApprovedCreations);

// // ADMIN ACTIONS
// router.put("/:id/status", authMiddleware, updateStatus);
// router.delete("/:id", authMiddleware, deleteMyCreation);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   createMyCreation,
//   getAllMyCreations,
//   getApprovedCreations,
//   updateStatus,
//   deleteMyCreation,
// } = require("../controllers/myCreationController");

// /* ================= CLOUDINARY STORAGE ================= */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder:
//       file.fieldname === "frameFile"
//         ? "my_creations/frames"
//         : "my_creations/files",
//     resource_type: file.mimetype.startsWith("video") ? "video" : "image",
//     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
//   }),
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 60 * 1024 * 1024 }, // 60MB
// });

// /* ================= TEMP AUTH (SAFE) ================= */
// const authMiddleware = (req, res, next) => {
//   if (req.query.user) {
//     req.user = { _id: req.query.user };
//   }

//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }

//   next();
// };

// /* ================= ROUTES ================= */

// // ✅ CREATE (USER AUTH REQUIRED)
// router.post(
//   "/",
//   authMiddleware,
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 },
//   ]),
//   (req, res, next) => {
//     // 🔥 user auto inject (no frontend bug)
//     req.body.user = req.user._id;
//     next();
//   },
//   createMyCreation
// );

// // ✅ ADMIN LIST (NO AUTH → NO 401)
// router.get("/", getAllMyCreations);

// // ✅ PUBLIC APPROVED (NO AUTH)
// router.get("/approved", getApprovedCreations);

// // ✅ ADMIN ACTIONS (AUTH REQUIRED)
// router.put("/:id/status", authMiddleware, updateStatus);
// router.delete("/:id", authMiddleware, deleteMyCreation);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   createMyCreation,
//   getAllMyCreations,
//   getApprovedCreations,
//   updateStatus,
//   deleteMyCreation,
// } = require("../controllers/myCreationController");

// const { protect, admin } = require("../middleware/authMiddleware");

// /* ================= CLOUDINARY STORAGE ================= */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder:
//       file.fieldname === "frameFile"
//         ? "my_creations/frames"
//         : "my_creations/files",
//     resource_type: file.mimetype.startsWith("video") ? "video" : "image",
//     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
//   }),
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 60 * 1024 * 1024 },
// });

// /* ================= ROUTES ================= */

// // ✅ CREATE (USER LOGIN REQUIRED)
// router.post(
//   "/",
//   protect, // 🔐 JWT auth
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 },
//   ]),
//   createMyCreation
// );

// // ✅ ADMIN LIST
// router.get("/", protect, admin, getAllMyCreations);

// // ✅ PUBLIC APPROVED (NO LOGIN REQUIRED)
// router.get("/approved", getApprovedCreations);

// // ✅ ADMIN ACTIONS
// router.put("/:id/status", protect, admin, updateStatus);
// router.delete("/:id", protect, admin, deleteMyCreation);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   createMyCreation,
//   getAllMyCreations,
//   getApprovedCreations,
//   updateStatus,
//   deleteMyCreation,
// } = require("../controllers/myCreationController");

// /* ================= CLOUDINARY STORAGE ================= */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder:
//       file.fieldname === "frameFile"
//         ? "my_creations/frames"
//         : "my_creations/files",
//     resource_type: file.mimetype.startsWith("video") ? "video" : "image",
//     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
//   }),
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 60 * 1024 * 1024 },
// });

// /* ================= TEMP AUTH (OLD STYLE – WORKING) ================= */
// const authMiddleware = (req, res, next) => {
//   if (req.query.user) {
//     req.user = { _id: req.query.user };
//   }

//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }

//   next();
// };

// /* ================= ROUTES ================= */

// // 👤 USER → CREATE (OLD STYLE)
// router.post(
//   "/",
//   authMiddleware,
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 },
//   ]),
//   (req, res, next) => {
//     // 🔥 inject user manually (IMPORTANT)
//     req.body.user = req.user._id;
//     next();
//   },
//   createMyCreation
// );

// // 👑 ADMIN → LIST ALL (NO AUTH)
// router.get("/", getAllMyCreations);

// // 👑 ADMIN → STATUS UPDATE (NO AUTH)
// router.put("/:id/status", updateStatus);

// // 👑 ADMIN → DELETE (NO AUTH)
// router.delete("/:id", deleteMyCreation);

// // 🌍 PUBLIC → APPROVED ONLY
// router.get("/approved", getApprovedCreations);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const { protect, admin } = require("../middleware/authMiddleware");

// const {
//   createMyCreation,
//   getAllMyCreations,
//   getApprovedCreations,
//   updateStatus,
//   deleteMyCreation,
// } = require("../controllers/myCreationController");

// /* ================= CLOUDINARY STORAGE ================= */
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: async (req, file) => ({
// //     folder:
// //       file.fieldname === "frameFile"
// //         ? "my_creations/frames"
// //         : "my_creations/files",
// //     resource_type: file.mimetype.startsWith("video") ? "video" : "image",
// //     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
// //   }),
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 60 * 1024 * 1024 },
// // });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isFrame = file.fieldname === "frameFile";

//     const isVideo =
//       !isFrame &&
//       (file.mimetype.startsWith("video") ||
//        file.originalname.match(/\.(mp4|mov|mkv|avi|webm)$/i));

//     return {
//       folder: isFrame
//         ? "my_creations/frames"
//         : "my_creations/files",

//       resource_type: isVideo ? "video" : "image",
//       public_id: `creation_${Date.now()}`,
//       format: isVideo ? "mp4" : "webp",
//     };
//   },
// });


// /* ================= ROUTES ================= */

// // 👤 USER → CREATE (JWT)
// // router.post(
// //   "/",
// //   protect,
// //   upload.fields([
// //     { name: "file", maxCount: 1 },
// //     { name: "frameFile", maxCount: 1 },
// //   ]),
// //   createMyCreation
// // );

// router.post(
//   "/",
//   protect,
//   (req, res, next) => {
//     upload.fields([
//       { name: "file", maxCount: 1 },
//       { name: "frameFile", maxCount: 1 },
//     ])(req, res, (err) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//           message: err.message || "Upload failed",
//         });
//       }
//       next();
//     });
//   },
//   createMyCreation
// );


// // 👑 ADMIN → LIST ALL
// router.get("/", protect, admin, getAllMyCreations);

// // 👑 ADMIN → STATUS UPDATE
// router.put("/:id/status", protect, admin, updateStatus);

// // 👑 ADMIN → DELETE
// router.delete("/:id", protect, admin, deleteMyCreation);

// // 🌍 PUBLIC → APPROVED ONLY
// router.get("/approved", getApprovedCreations);

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  createMyCreation,
  getAllMyCreations,
  getApprovedCreations,
  updateStatus,
  deleteMyCreation,
    getMyApprovedCreations,
} = require("../controllers/myCreationController");

/* ================= CLOUDINARY STORAGE ================= */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isFrame = file.fieldname === "frameFile";

    const isVideo =
      !isFrame &&
      (file.mimetype.startsWith("video") ||
        file.originalname.match(/\.(mp4|mov|mkv|avi|webm)$/i));

    return {
      folder: isFrame
        ? "my_creations/frames"
        : "my_creations/files",

      resource_type: isVideo ? "video" : "image",
      public_id: `creation_${Date.now()}`,
      format: isVideo ? "mp4" : "webp",
    };
  },
});

/* 🔥 THIS WAS MISSING */
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB (large videos safe)
  },
});

/* ================= ROUTES ================= */

// 👤 USER → CREATE (JWT + FILE UPLOAD)
router.post(
  "/",
  protect,
  (req, res, next) => {
    upload.fields([
      { name: "file", maxCount: 1 },
      { name: "frameFile", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) {
        console.error("❌ Upload Error:", err);
        return res.status(400).json({
          success: false,
          message: err.message || "Upload failed",
        });
      }
      next();
    });
  },
  createMyCreation
);

// 👑 ADMIN → LIST ALL
router.get("/", protect, admin, getAllMyCreations);

// 👑 ADMIN → STATUS UPDATE
router.put("/:id/status", protect, admin, updateStatus);

// 👑 ADMIN → DELETE
router.delete("/:id", protect, admin, deleteMyCreation);

// 🌍 PUBLIC → APPROVED ONLY
router.get("/approved", getApprovedCreations);
router.get("/my-approved", protect, getMyApprovedCreations);

module.exports = router;
