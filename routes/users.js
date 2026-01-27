// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const { getUsers } = require("../controllers/userController");
// // // // // // const { protect } = require("../middleware/authMiddleware");

// // // // // // router.get("/", protect, getUsers);

// // // // // // module.exports = router;
// // // // // // ``
// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const multer = require("multer");
// // // // // const { getUsers, getUserById, updateProfile } = require("../controllers/userController");
// // // // // const { protect } = require("../middleware/authMiddleware");

// // // // // // multer memory storage (so we don't write to disk)
// // // // // const storage = multer.memoryStorage();
// // // // // const upload = multer({ storage });

// // // // // // List users
// // // // // router.get("/", protect, getUsers);

// // // // // // Get single user by id
// // // // // router.get("/:id", protect, getUserById);

// // // // // // Update profile of logged in user
// // // // // // Accepts: multipart/form-data (avatar file) OR application/json (image as base64 in 'image')
// // // // // router.put("/profile", protect, upload.single("avatar"), updateProfile);

// // // // // module.exports = router;

// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const multer = require("multer");
// // // // const { getUsers, getUserById, updateProfile } = require("../controllers/userController");
// // // // const { protect } = require("../middleware/authMiddleware");

// // // // // 🔹 Use memory storage for file buffer upload
// // // // const storage = multer.memoryStorage();
// // // // const upload = multer({ storage });

// // // // // List users
// // // // router.get("/", protect, getUsers);

// // // // // Get single user by ID
// // // // router.get("/:id", protect, getUserById);

// // // // // Update user profile (supports image via form-data or base64 JSON)
// // // // router.put("/profile", protect, upload.single("avatar"), updateProfile);

// // // // module.exports = router;
// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { getUsers, getUserById, updateProfile } = require("../controllers/userController");
// // // const { protect } = require("../middleware/authMiddleware");

// // // // ✅ Use memory storage (direct upload to Cloudinary)
// // // const upload = multer({ storage: multer.memoryStorage() });

// // // // List all users
// // // router.get("/", protect, getUsers);

// // // // Get one user
// // // router.get("/:id", protect, getUserById);

// // // // Update profile with image (form-data: name, bio, avatar)
// // // router.put("/profile", protect, upload.single("avatar"), updateProfile);

// // // module.exports = router;


// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getUsers,
// //   getUserById,
// //   updateProfile,
// // } = require("../controllers/userController");
// // const { protect } = require("../middleware/authMiddleware");
// // const upload = require("../middleware/upload");

// // // ✅ Routes
// // router.get("/", protect, getUsers);
// // router.get("/:id", protect, getUserById);
// // router.put("/profile", protect, upload.single("avatar"), updateProfile);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser
// } = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");

// // CRUD ROUTES
// router.get("/", protect, getUsers);
// router.get("/:id", protect, getUserById);
// router.post("/", protect, createUser);          // CREATE
// router.put("/:id", protect, updateUser);        // UPDATE
// router.delete("/:id", protect, deleteUser);     // DELETE

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const userController = require("../controllers/userController");
// const { protect, admin } = require("../middleware/authMiddleware");

// const upload = multer({ storage: multer.memoryStorage() });

// /* 🔹 PROFILE ROUTES — ALWAYS TOP */
// router.get("/profile", protect, (req, res) => {
//   res.json({
//     success: true,
//     user: req.user,
//   });
// });

// router.put(
//   "/profile",
//   protect,
//   upload.single("avatar"),
//   userController.updateProfile
// );

// /* 🔹 OTHER ROUTES */
// router.post("/", protect, admin, userController.createUser);
// router.get("/", protect, userController.getUsers);
// router.get("/:id", protect, userController.getUserById);
// router.delete("/:id", protect, admin, userController.deleteUser);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const userController = require("../controllers/userController");
// const { protect, admin } = require("../middleware/authMiddleware");

// const upload = multer({ storage: multer.memoryStorage() });

// /* =====================================================
//    🔹 PROFILE ROUTES (Logged-in User)
//    NOTE: Static routes ALWAYS on top
// ===================================================== */

// // ✅ GET own profile
// router.get("/profile", protect, (req, res) => {
//   res.json({
//     success: true,
//     user: req.user,
//   });
// });

// // ✅ UPDATE own profile
// router.put(
//   "/profile",
//   protect,
//   upload.single("avatar"),
//   userController.updateProfile
// );

// /* =====================================================
//    🔹 ADMIN CRUD ROUTES
// ===================================================== */

// // ✅ CREATE user (Admin)
// router.post("/", protect, admin, userController.createUser);

// // ✅ READ all users (Admin)
// router.get("/", protect, admin, userController.getUsers);

// // ✅ READ single user by ID (Admin)
// router.get("/:id", protect, admin, userController.getUserById);

// // ✅ UPDATE user by ID (Admin)
// router.put("/:id", protect, admin, userController.updateUserById);

// // ✅ DELETE user by ID (Admin)
// router.delete("/:id", protect, admin, userController.deleteUser);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

/* =====================================================
   📦 MULTER CONFIG (Memory Storage)
===================================================== */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

/* =====================================================
   🔹 PROFILE ROUTES (Logged-in User)
   NOTE: Static routes ALWAYS on top
===================================================== */

// ✅ GET own profile
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// ✅ UPDATE own profile (avatar + fields)
router.put(
  "/profile",
  protect,
  upload.single("avatar"), // <input name="avatar" />
  userController.updateProfile
);

/* =====================================================
   🔹 ADMIN CRUD ROUTES
===================================================== */

// ✅ CREATE user (Admin)
router.post("/", protect, admin, userController.createUser);

// ✅ READ all users (Admin)
router.get("/", protect, admin, userController.getUsers);

// ✅ READ single user by ID (Admin)
router.get("/:id", protect, admin, userController.getUserById);

// ✅ UPDATE user by ID (Admin)
router.put("/:id", protect, admin, userController.updateUserById);

// ✅ DELETE user by ID (Admin)
router.delete("/:id", protect, admin, userController.deleteUser);

module.exports = router;
