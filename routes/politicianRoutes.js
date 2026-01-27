// // <<<<<<< HEAD
// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");
// // // const {
// // //   getPoliticians,
// // //   createPolitician,
// // //   updatePolitician,
// // //   deletePolitician
// // // } = require("../controllers/politicianController");

// // // // Cloudinary storage
// // // const storage = new CloudinaryStorage({
// // //   cloudinary: cloudinary,
// // //   params: {
// // //     folder: "politicians",
// // //     allowed_formats: ["jpg","jpeg","png","webp"],
// // //   },
// // // });
// // // const upload = multer({ storage });

// // // // Routes
// // // router.get("/", getPoliticians);
// // // router.post("/", upload.single("logo"), createPolitician);
// // // router.put("/:id", upload.single("logo"), updatePolitician);
// // // router.delete("/:id", deletePolitician);

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { createPolitician, getPoliticians, updatePolitician, deletePolitician } = require("../controllers/politicianController");

// // const upload = multer({ dest: "uploads/" });

// // // CRUD Routes
// // router.post("/", upload.single("file"), createPolitician);
// // router.get("/", getPoliticians);
// // router.put("/:id", upload.single("file"), updatePolitician);
// // =======
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("../config/cloudinary");
// // const {
// //   getPoliticians,
// //   createPolitician,
// //   updatePolitician,
// //   deletePolitician
// // } = require("../controllers/politicianController");

// // // Cloudinary storage
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: "politicians",
// //     allowed_formats: ["jpg","jpeg","png","webp"],
// //   },
// // });
// // const upload = multer({ storage });

// // // Routes
// // router.get("/", getPoliticians);
// // router.post("/", upload.single("logo"), createPolitician);
// // router.put("/:id", upload.single("logo"), updatePolitician);
// // >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// // router.delete("/:id", deletePolitician);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const {
//   getPoliticians,
//   createPolitician,
//   updatePolitician,
//   deletePolitician
// } = require("../controllers/politicianController");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "politicians",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });
// const upload = multer({ storage });

// // CRUD Routes
// router.get("/", getPoliticians);
// router.post("/", upload.single("logo"), createPolitician);
// router.put("/:id", upload.single("logo"), updatePolitician);
// router.delete("/:id", deletePolitician);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   getPoliticians,
//   createPolitician,
//   updatePolitician,
//   deletePolitician
// } = require("../controllers/politicianController");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "politicians",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// // CRUD Routes
// router.get("/", getPoliticians);
// router.post("/", upload.single("logo"), createPolitician);
// router.put("/:id", upload.single("logo"), updatePolitician);
// router.delete("/:id", deletePolitician);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   getPoliticians,
//   createPolitician,
//   updatePolitician,
//   deletePolitician
// } = require("../controllers/politicianController");

// // ⭐ Cloudinary Storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "politicians",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// // ⭐ Multer Instance
// const upload = multer({ storage });

// // =============================================================
// // ⭐ ROUTES
// // =============================================================

// // GET ALL Politicians
// router.get("/", getPoliticians);

// // CREATE Politician — Upload Logo + Banner
// router.post(
//   "/",
//   upload.fields([
//     { name: "logo", maxCount: 1 },
//     { name: "banner", maxCount: 1 }
//   ]),
//   createPolitician
// );

// // UPDATE Politician — Replace Logo/Banner
// router.put(
//   "/:id",
//   upload.fields([
//     { name: "logo", maxCount: 1 },
//     { name: "banner", maxCount: 1 }
//   ]),
//   updatePolitician
// );

// // DELETE Politician
// router.delete("/:id", deletePolitician);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  getPoliticians,
  createPolitician,
  updatePolitician,
  deletePolitician,
} = require("../controllers/politicianController");

/* =============================================================
   ⭐ CLOUDINARY STORAGE (IMAGE + VIDEO SUPPORT)
============================================================= */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: "politicians",
      resource_type: isVideo ? "video" : "image", // 🔥 IMPORTANT
      allowed_formats: isVideo
        ? ["mp4", "webm"]
        : ["jpg", "jpeg", "png", "webp"],
    };
  },
});

/* =============================================================
   ⭐ MULTER INSTANCE
============================================================= */
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 🔥 50MB (image/video safe)
  },
});

/* =============================================================
   ⭐ ROUTES
============================================================= */

// ✅ GET ALL POLITICIANS (pagination + search)
router.get("/", getPoliticians);

// ✅ CREATE POLITICIAN — Logo (image/video) + Banner (image)
router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createPolitician
);

// ✅ UPDATE POLITICIAN — Replace Logo / Banner
router.put(
  "/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updatePolitician
);

// ✅ DELETE POLITICIAN — Cloudinary cleanup inside controller
router.delete("/:id", deletePolitician);

module.exports = router;