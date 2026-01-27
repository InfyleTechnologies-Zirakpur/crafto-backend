
// <<<<<<< HEAD

// =======
// // const Category = require("../models/categoryModel");
// // const path = require("path");

// // // ✅ Get all categories
// // exports.getCategories = async (req, res) => {
// //   try {
// //     const categories = await Category.find();
// //     res.json(categories);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Create new category
// // exports.createCategory = async (req, res) => {
// //   try {
// //     const { name, orientation } = req.body;
// //     const filePath = req.file ? `/uploads/${req.file.filename}` : null;

// //     const category = await Category.create({ name, orientation, filePath });
// //     res.json(category);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Update category
// // exports.updateCategory = async (req, res) => {
// //   try {
// //     const { name, orientation } = req.body;
// //     const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

// //     const updateData = { name, orientation };
// //     if (filePath) updateData.filePath = filePath;

// //     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
// //     if (!updated) return res.status(404).json({ message: "Category not found" });
// //     res.json(updated);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Delete category
// // exports.deleteCategory = async (req, res) => {
// //   try {
// //     const deleted = await Category.findByIdAndDelete(req.params.id);
// //     if (!deleted) return res.status(404).json({ message: "Category not found" });
// //     res.json({ message: "Category deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// const Category = require("../models/categoryModel");
// const path = require("path");

// // ✅ Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Create new category (image only)
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, orientation } = req.body;
//     const filePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const category = await Category.create({
//       name,
//       orientation,
//       filePath,
//     });

//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update category
// exports.updateCategory = async (req, res) => {
//   try {
//     const { name, orientation } = req.body;
//     const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const updateData = { name, orientation };
//     if (filePath) updateData.filePath = filePath;

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Category not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Category not found" });
//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }

// };

// const Category = require("../models/categoryModel");
// const path = require("path");

// // ✅ Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Create new category (image only)
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, orientation } = req.body;
//     const filePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const category = await Category.create({
//       name,
//       orientation,
//       filePath,
//     });

//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update category
// exports.updateCategory = async (req, res) => {
//   try {
//     const { name, orientation } = req.body;
//     const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const updateData = { name, orientation };
//     if (filePath) updateData.filePath = filePath;

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Category not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Category not found" });
//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Category = require("../models/categoryModel");

/* =====================================================
   GET ALL CATEGORIES (with populate)
===================================================== */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("religious")
      .populate("language")
      .populate("festival")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (err) {
    console.error("GET CATEGORIES ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   CREATE CATEGORY (Cloudinary Image + Festival Support)
===================================================== */
exports.createCategory = async (req, res) => {
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

    res.status(201).json(category);
  } catch (err) {
    console.error("CREATE CATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   UPDATE CATEGORY
===================================================== */
exports.updateCategory = async (req, res) => {
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
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   DELETE CATEGORY
===================================================== */
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
