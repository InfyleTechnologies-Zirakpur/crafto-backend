// <<<<<<< HEAD
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("../config/cloudinary");
// // const Category = require("../models/categoryModel");

// // // Cloudinary storage
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: "categories",
// //     allowed_formats: ["jpg", "jpeg", "png", "webp"],
// =======

// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const path = require("path");
// // const {
// //   getCategories,
// //   createCategory,
// //   updateCategory,
// //   deleteCategory,
// // } = require("../controllers/categoryController");

// // // ✅ File upload setup
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, "../uploads"));
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + "-" + file.originalname);
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// //   },
// // });

// // const upload = multer({ storage });

// <<<<<<< HEAD
// // // Create category
// // router.post("/", upload.single("file"), async (req, res) => {
// //   try {
// //     const { name, orientation, status } = req.body;
// //     const filePath = req.file ? req.file.path : null;

// //     const newCategory = new Category({ name, orientation, status, filePath });
// //     await newCategory.save();
// //     res.status(201).json(newCategory);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });

// // // Get all categories
// // router.get("/", async (req, res) => {
// //   try {
// //     const categories = await Category.find();
// //     res.json(categories);
// //   } catch (err) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });

// // // Update category
// // router.put("/:id", upload.single("file"), async (req, res) => {
// //   try {
// //     const { name, orientation, status } = req.body;
// //     const updateData = { name, orientation, status };

// //     if (req.file) updateData.filePath = req.file.path;

// //     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
// //     if (!updated) return res.status(404).json({ message: "Category not found" });
// //     res.json(updated);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });

// // // Delete category
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     const deleted = await Category.findByIdAndDelete(req.params.id);
// //     if (!deleted) return res.status(404).json({ message: "Category not found" });
// //     res.json({ message: "Category deleted successfully" });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });
// =======
// // // ✅ Routes
// // router.get("/", getCategories);
// // router.post("/", upload.single("file"), createCategory);
// // router.put("/:id", upload.single("file"), updateCategory);
// // router.delete("/:id", deleteCategory);
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const Category = require("../models/categoryModel");

// <<<<<<< HEAD
// // Cloudinary setup
// const storage = new CloudinaryStorage({
//   cloudinary,
// =======
// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
//   params: {
//     folder: "categories",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// <<<<<<< HEAD
// // Create Category
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status, religious, language } = req.body;
//     const filePath = req.file ? req.file.path : null;

//     const newCategory = new Category({
//       name,
//       orientation,
//       status,
//       filePath,
//       religious: religious || null,
//       language: language || null,
//     });

//     await newCategory.save();
//     const populated = await newCategory.populate(["religious", "language"]);
//     res.status(201).json(populated);
//   } catch (err) {
//     console.error(err);
// =======
// // Create category
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status } = req.body;
//     const filePath = req.file ? req.file.path : null;

//     const newCategory = new Category({ name, orientation, status, filePath });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (err) {
//     console.log(err);
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// <<<<<<< HEAD
// // Get All Categories
// router.get("/", async (req, res) => {
//   try {
//     const categories = await Category.find()
//       .populate("religious")
//       .populate("language");
// =======
// // Get all categories
// router.get("/", async (req, res) => {
//   try {
//     const categories = await Category.find();
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// <<<<<<< HEAD
// // Update
// router.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status, religious, language } = req.body;
//     const updateData = { name, orientation, status, religious, language };

//     if (req.file) updateData.filePath = req.file.path;

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     })
//       .populate("religious")
//       .populate("language");

//     if (!updated) return res.status(404).json({ message: "Category not found" });
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
// =======
// // Update category
// router.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status } = req.body;
//     const updateData = { name, orientation, status };

//     if (req.file) updateData.filePath = req.file.path;

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Category not found" });
//     res.json(updated);
//   } catch (err) {
//     console.log(err);
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// <<<<<<< HEAD
// // Delete
// =======
// // Delete category
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Category not found" });
//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
// <<<<<<< HEAD
//     console.error(err);
// =======
//     console.log(err);
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// <<<<<<< HEAD
// module.exports = router;

// =======
// module.exports = router;
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const Category = require("../models/categoryModel");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "categories",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// // Create Category
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status, religious, language } = req.body;
//     const filePath = req.file ? req.file.path : null;

//     const newCategory = new Category({
//       name,
//       orientation,
//       status,
//       filePath,
//       religious: religious || null,
//       language: language || null,
//     });

//     await newCategory.save();
//     const populated = await newCategory.populate(["religious", "language"]);
//     res.status(201).json(populated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get All Categories
// router.get("/", async (req, res) => {
//   try {
//     const categories = await Category.find()
//       .populate("religious")
//       .populate("language");
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Update Category
// router.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status, religious, language } = req.body;
//     const updateData = { name, orientation, status, religious, language };

//     if (req.file) updateData.filePath = req.file.path;

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     })
//       .populate("religious")
//       .populate("language");

//     if (!updated) return res.status(404).json({ message: "Category not found" });
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Delete Category
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Category not found" });
//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Category = require("../models/categoryModel");

/* =====================================================
   CLOUDINARY STORAGE
===================================================== */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "categories",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

/* =====================================================
   CREATE CATEGORY
===================================================== */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const {
      name,
      orientation,
      status,
      religious,
      language,
      isFestivalCategory,
      festival,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name required" });
    }

    const category = await Category.create({
      name: name.trim(),
      orientation: orientation || "portrait",
      status: status || "active",

      religious: religious || null,
      language: language || null,

      filePath: req.file?.path || "",
      filePublicId: req.file?.filename || "",

      isFestivalCategory:
        isFestivalCategory === true || isFestivalCategory === "true",

      festival: festival || null,
    });

    const populated = await category.populate([
      "religious",
      "language",
      "festival",
    ]);

    res.status(201).json(populated);
  } catch (err) {
    console.error("CREATE CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =====================================================
   GET ALL CATEGORIES
===================================================== */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("religious")
      .populate("language")
      .populate("festival")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (err) {
    console.error("GET CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =====================================================
   UPDATE CATEGORY
===================================================== */
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const {
      name,
      orientation,
      status,
      religious,
      language,
      isFestivalCategory,
      festival,
    } = req.body;

    const updateData = {
      name,
      orientation,
      status,
      religious: religious || null,
      language: language || null,
      isFestivalCategory:
        isFestivalCategory === true || isFestivalCategory === "true",
      festival: festival || null,
    };

    if (req.file) {
      updateData.filePath = req.file.path;
      updateData.filePublicId = req.file.filename;
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("religious")
      .populate("language")
      .populate("festival");

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("UPDATE CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =====================================================
   DELETE CATEGORY
===================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
