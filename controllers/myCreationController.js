// // // const MyCreation = require("../models/MyCreation");
// // // const cloudinary = require("../config/cloudinary");

// // // // helper
// // // const getFileInfo = (filesObj, fieldName) => {
// // //   if (!filesObj) return null;
// // //   const arr = filesObj[fieldName];
// // //   if (!arr || !arr.length) return null;
// // //   const f = arr[0];
// // //   return {
// // //     url: f.path || f.secure_url || f.url || null,
// // //     public_id: f.filename || f.public_id || f.publicId || null,
// // //   };
// // // };

// // // // 🔹 Create new MyCreation (User upload)
// // // exports.createMyCreation = async (req, res) => {
// // //   try {
// // //     const { user, title, description, type, category, orientation, profilePosition, transitionType } = req.body;
// // //     if (!user || !title)
// // //       return res.status(400).json({ success: false, message: "User and title are required" });

// // //     const mainFile = getFileInfo(req.files, "file");
// // //     const frameFile = getFileInfo(req.files, "frameFile");

// // //     const creation = await MyCreation.create({
// // //       user,
// // //       title,
// // //       description,
// // //       type,
// // //       category,
// // //       orientation,
// // //       profilePosition,
// // //       transitionType,
// // //       file: mainFile?.url,
// // //       filePublicId: mainFile?.public_id,
// // //       frameFile: frameFile?.url,
// // //       frameFilePublicId: frameFile?.public_id,
// // //     });

// // //     const populated = await MyCreation.findById(creation._id).populate("user").populate("category");
// // //     res.status(201).json({ success: true, creation: populated });
// // //   } catch (err) {
// // //     console.error("Create MyCreation Error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // // 🔹 Get all MyCreations (Admin view)
// // // exports.getAllMyCreations = async (req, res) => {
// // //   try {
// // //     const creations = await MyCreation.find()
// // //       .populate("user")
// // //       .populate("category")
// // //       .sort({ createdAt: -1 });
// // //     res.json({ success: true, creations });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // // 🔹 Get approved creations (Public)
// // // exports.getApprovedCreations = async (req, res) => {
// // //   try {
// // //     const creations = await MyCreation.find({ status: "approved" })
// // //       .populate("user")
// // //       .populate("category")
// // //       .sort({ createdAt: -1 });
// // //     res.json({ success: true, creations });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // // 🔹 Admin approve/reject
// // // exports.updateStatus = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const { status, adminComment } = req.body;

// // //     if (!["approved", "rejected"].includes(status))
// // //       return res.status(400).json({ success: false, message: "Invalid status" });

// // //     const updated = await MyCreation.findByIdAndUpdate(
// // //       id,
// // //       { status, adminComment },
// // //       { new: true }
// // //     )
// // //       .populate("user")
// // //       .populate("category");

// // //     if (!updated) return res.status(404).json({ success: false, message: "Creation not found" });
// // //     res.json({ success: true, creation: updated });
// // //   } catch (err) {
// // //     console.error("Update MyCreation Error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // // 🔹 Delete creation
// // // exports.deleteMyCreation = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const deleted = await MyCreation.findByIdAndDelete(id);
// // //     if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

// // //     try {
// // //       if (deleted.filePublicId)
// // //         await cloudinary.uploader.destroy(deleted.filePublicId, { resource_type: "auto" });
// // //       if (deleted.frameFilePublicId)
// // //         await cloudinary.uploader.destroy(deleted.frameFilePublicId, { resource_type: "image" });
// // //     } catch (err) {
// // //       console.warn("Cloudinary cleanup failed:", err.message);
// // //     }

// // //     res.json({ success: true, message: "Deleted successfully" });
// // //   } catch (err) {
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // const MyCreation = require("../models/MyCreation");
// // // const Category = require("../models/categoryModel");
// // // const cloudinary = require("../config/cloudinary");

// // // /* =====================================================
// // //    HELPER : FILE INFO
// // // ===================================================== */
// // // const getFileInfo = (filesObj, fieldName) => {
// // //   if (!filesObj) return null;

// // //   const arr = filesObj[fieldName];
// // //   if (!arr || !arr.length) return null;

// // //   const f = arr[0];
// // //   return {
// // //     url: f.path || f.secure_url || f.url || null,
// // //     public_id: f.filename || f.public_id || f.publicId || null,
// // //   };
// // // };

// // // /* =====================================================
// // //    CREATE MY CREATION (USER UPLOAD)
// // // ===================================================== */
// // // exports.createMyCreation = async (req, res) => {
// // //   try {
// // //     const {
// // //       user,
// // //       title,
// // //       description,
// // //       type,
// // //       category,
// // //       orientation,
// // //       profilePosition,
// // //       transitionType,
// // //     } = req.body;

// // //     if (!user || !title) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "User and title are required",
// // //       });
// // //     }

// // //     const mainFile = getFileInfo(req.files, "file");
// // //     const frameFile = getFileInfo(req.files, "frameFile");

// // //     const creation = await MyCreation.create({
// // //       user,
// // //       title,
// // //       description,
// // //       type,
// // //       category,
// // //       orientation,
// // //       profilePosition,
// // //       transitionType,
// // //       file: mainFile?.url,
// // //       filePublicId: mainFile?.public_id,
// // //       frameFile: frameFile?.url,
// // //       frameFilePublicId: frameFile?.public_id,
// // //     });

// // //     const populated = await MyCreation.findById(creation._id)
// // //       .populate("user")
// // //       .populate("category");

// // //     return res.status(201).json({
// // //       success: true,
// // //       creation: populated,
// // //     });
// // //   } catch (err) {
// // //     console.error("Create MyCreation Error:", err);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // };

// // // /* =====================================================
// // //    GET ALL MY CREATIONS (ADMIN)
// // // ===================================================== */
// // // exports.getAllMyCreations = async (req, res) => {
// // //   try {
// // //     const creations = await MyCreation.find()
// // //       .populate("user")
// // //       .populate("category")
// // //       .sort({ createdAt: -1 });

// // //     return res.json({
// // //       success: true,
// // //       creations,
// // //     });
// // //   } catch (err) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // };

// // // /* =====================================================
// // //    GET APPROVED CREATIONS (PUBLIC)
// // // ===================================================== */
// // // exports.getApprovedCreations = async (req, res) => {
// // //   try {
// // //     const creations = await MyCreation.find({ status: "approved" })
// // //       .populate("user")
// // //       .populate("category")
// // //       .sort({ createdAt: -1 });

// // //     return res.json({
// // //       success: true,
// // //       creations,
// // //     });
// // //   } catch (err) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // };

// // // /* =====================================================
// // //    ADMIN APPROVE / REJECT (🔥 DAY SPECIAL LOGIC HERE)
// // // ===================================================== */
// // // exports.updateStatus = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const { status, adminComment } = req.body;

// // //     if (!["approved", "rejected"].includes(status)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid status",
// // //       });
// // //     }

// // //     let creation = await MyCreation.findById(id).populate("category");

// // //     if (!creation) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Creation not found",
// // //       });
// // //     }

// // //     /* 🔥 DAY SPECIAL AUTO ASSIGN */
// // //     if (status === "approved" && creation.category?.isFestivalCategory) {
// // //       const daySpecialCategory = await Category.findOne({
// // //         name: "Day Special",
// // //         status: "active",
// // //       });

// // //       if (daySpecialCategory) {
// // //         creation.category = daySpecialCategory._id;
// // //       }
// // //     }

// // //     creation.status = status;
// // //     creation.adminComment = adminComment || "";
// // //     await creation.save();

// // //     const populated = await MyCreation.findById(creation._id)
// // //       .populate("user")
// // //       .populate("category");

// // //     return res.json({
// // //       success: true,
// // //       creation: populated,
// // //     });
// // //   } catch (err) {
// // //     console.error("Update MyCreation Error:", err);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // };

// // // /* =====================================================
// // //    DELETE MY CREATION
// // // ===================================================== */
// // // exports.deleteMyCreation = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;

// // //     const deleted = await MyCreation.findByIdAndDelete(id);
// // //     if (!deleted) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Creation not found",
// // //       });
// // //     }

// // //     /* Cloudinary Cleanup */
// // //     try {
// // //       if (deleted.filePublicId) {
// // //         await cloudinary.uploader.destroy(deleted.filePublicId, {
// // //           resource_type: "auto",
// // //         });
// // //       }

// // //       if (deleted.frameFilePublicId) {
// // //         await cloudinary.uploader.destroy(deleted.frameFilePublicId, {
// // //           resource_type: "image",
// // //         });
// // //       }
// // //     } catch (err) {
// // //       console.warn("Cloudinary cleanup failed:", err.message);
// // //     }

// // //     return res.json({
// // //       success: true,
// // //       message: "Deleted successfully",
// // //     });
// // //   } catch (err) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // };

// // const MyCreation = require("../models/MyCreation");
// // const Category = require("../models/categoryModel");
// // const cloudinary = require("../config/cloudinary");

// // /* =====================================================
// //    HELPER : FILE INFO (Cloudinary / Multer)
// // ===================================================== */
// // const getFileInfo = (filesObj, fieldName) => {
// //   if (!filesObj) return null;

// //   const arr = filesObj[fieldName];
// //   if (!arr || !arr.length) return null;

// //   const f = arr[0];
// //   return {
// //     url: f.path || f.secure_url || f.url || null,
// //     public_id: f.filename || f.public_id || f.publicId || null,
// //   };
// // };

// // /* =====================================================
// //    CREATE MY CREATION (USER UPLOAD)
// //    ✔ category STRING → ObjectId
// // ===================================================== */
// // exports.createMyCreation = async (req, res) => {
// //   try {
// //     const {
// //       user,
// //       title,
// //       description,
// //       type,
// //       category, // 👈 STRING from frontend
// //       orientation,
// //       profilePosition,
// //       transitionType,
// //     } = req.body;

// //     if (!user || !title) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "User and title are required",
// //       });
// //     }

// //     /* =============================
// //        🔥 CATEGORY STRING → OBJECT ID
// //     ============================== */
// //     let categoryId = null;

// //     if (category && typeof category === "string") {
// //       const categoryDoc = await Category.findOne({
// //         name: { $regex: `^${category.trim()}$`, $options: "i" }, // case-insensitive
// //         status: "active",
// //       });

// //       if (!categoryDoc) {
// //         return res.status(400).json({
// //           success: false,
// //           message: `Category '${category}' not found or inactive`,
// //         });
// //       }

// //       categoryId = categoryDoc._id;
// //     }

// //     /* =============================
// //        FILES
// //     ============================== */
// //     const mainFile = getFileInfo(req.files, "file");
// //     const frameFile = getFileInfo(req.files, "frameFile");

// //     /* =============================
// //        CREATE DOCUMENT
// //     ============================== */
// //     const creation = await MyCreation.create({
// //       user,
// //       title,
// //       description: description || "",
// //       type: type || "video",
// //       category: categoryId,
// //       orientation: orientation || "landscape",
// //       profilePosition: profilePosition || "center",
// //       transitionType: transitionType || "fade",
// //       file: mainFile?.url || null,
// //       filePublicId: mainFile?.public_id || null,
// //       frameFile: frameFile?.url || null,
// //       frameFilePublicId: frameFile?.public_id || null,
// //     });

// //     const populated = await MyCreation.findById(creation._id)
// //       .populate("user")
// //       .populate("category");

// //     return res.status(201).json({
// //       success: true,
// //       creation: populated,
// //     });
// //   } catch (err) {
// //     console.error("❌ Create MyCreation Error:", err);
// //     return res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // };

// // /* =====================================================
// //    GET ALL MY CREATIONS (ADMIN)
// // ===================================================== */
// // exports.getAllMyCreations = async (req, res) => {
// //   try {
// //     const creations = await MyCreation.find()
// //       .populate("user")
// //       .populate("category")
// //       .sort({ createdAt: -1 });

// //     return res.json({
// //       success: true,
// //       creations,
// //     });
// //   } catch (err) {
// //     return res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // };

// // /* =====================================================
// //    GET APPROVED CREATIONS (PUBLIC)
// // ===================================================== */
// // exports.getApprovedCreations = async (req, res) => {
// //   try {
// //     const creations = await MyCreation.find({ status: "approved" })
// //       .populate("user")
// //       .populate("category")
// //       .sort({ createdAt: -1 });

// //     return res.json({
// //       success: true,
// //       creations,
// //     });
// //   } catch (err) {
// //     return res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // };

// // /* =====================================================
// //    ADMIN APPROVE / REJECT
// //    🔥 Festival → Day Special Auto Switch
// // ===================================================== */
// // exports.updateStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { status, adminComment } = req.body;

// //     if (!["approved", "rejected"].includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid status",
// //       });
// //     }

// //     let creation = await MyCreation.findById(id).populate("category");

// //     if (!creation) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Creation not found",
// //       });
// //     }

// //     /* 🔥 DAY SPECIAL AUTO ASSIGN */
// //     if (status === "approved" && creation.category?.isFestivalCategory) {
// //       const daySpecialCategory = await Category.findOne({
// //         name: { $regex: "^Day Special$", $options: "i" },
// //         status: "active",
// //       });

// //       if (daySpecialCategory) {
// //         creation.category = daySpecialCategory._id;
// //       }
// //     }

// //     creation.status = status;
// //     creation.adminComment = adminComment || "";
// //     await creation.save();

// //     const populated = await MyCreation.findById(creation._id)
// //       .populate("user")
// //       .populate("category");

// //     return res.json({
// //       success: true,
// //       creation: populated,
// //     });
// //   } catch (err) {
// //     console.error("❌ Update MyCreation Error:", err);
// //     return res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // };

// // /* =====================================================
// //    DELETE MY CREATION
// // ===================================================== */
// // exports.deleteMyCreation = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const deleted = await MyCreation.findByIdAndDelete(id);
// //     if (!deleted) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Creation not found",
// //       });
// //     }

// //     /* =============================
// //        CLOUDINARY CLEANUP
// //     ============================== */
// //     try {
// //       if (deleted.filePublicId) {
// //         await cloudinary.uploader.destroy(deleted.filePublicId, {
// //           resource_type: "auto",
// //         });
// //       }

// //       if (deleted.frameFilePublicId) {
// //         await cloudinary.uploader.destroy(deleted.frameFilePublicId, {
// //           resource_type: "image",
// //         });
// //       }
// //     } catch (err) {
// //       console.warn("⚠ Cloudinary cleanup failed:", err.message);
// //     }

// //     return res.json({
// //       success: true,
// //       message: "Deleted successfully",
// //     });
// //   } catch (err) {
// //     return res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // };

// const MyCreation = require("../models/MyCreation");
// const Category = require("../models/categoryModel");
// const User = require("../models/User");
// const cloudinary = require("../config/cloudinary");

// /* =====================================================
//    HELPER : FILE INFO (Cloudinary / Multer)
// ===================================================== */
// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj || !filesObj[fieldName]?.length) return null;

//   const f = filesObj[fieldName][0];
//   return {
//     url: f.path || f.secure_url || f.url || null,
//     public_id: f.filename || f.public_id || f.publicId || null,
//   };
// };

// /* =====================================================
//    CREATE MY CREATION (USER UPLOAD)
// ===================================================== */
// exports.createMyCreation = async (req, res) => {
//   try {
//     const {
//       user,
//       title,
//       description,
//       type,
//       category,
//       orientation,
//       profilePosition,
//       transitionType,
//     } = req.body;

//     /* ---------- VALIDATION ---------- */
//     if (!user || !title) {
//       return res.status(400).json({
//         success: false,
//         message: "User and title are required",
//       });
//     }

//     /* ---------- FETCH USER ---------- */
//     const userDoc = await User.findById(user).select("name");
//     if (!userDoc) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user",
//       });
//     }

//     /* ---------- CATEGORY STRING → OBJECT ID ---------- */
//     let categoryId = null;
//     if (category && typeof category === "string") {
//       const categoryDoc = await Category.findOne({
//         name: { $regex: `^${category.trim()}$`, $options: "i" },
//         status: "active",
//       });

//       if (!categoryDoc) {
//         return res.status(400).json({
//           success: false,
//           message: `Category '${category}' not found or inactive`,
//         });
//       }
//       categoryId = categoryDoc._id;
//     }

//     /* ---------- FILES ---------- */
//     const mainFile = getFileInfo(req.files, "file");
//     const frameFile = getFileInfo(req.files, "frameFile");

//     /* ---------- CREATE DOCUMENT ---------- */
//     const creation = await MyCreation.create({
//       user,
//       contentOwnerName: userDoc.name?.trim() || "",
//       title: title.trim(),
//       description: description || "",
//       type: type || "video",
//       category: categoryId,
//       orientation: orientation || "landscape",
//       profilePosition: profilePosition || "center",
//       transitionType: transitionType || "fade",
//       file: mainFile?.url || null,
//       filePublicId: mainFile?.public_id || null,
//       frameFile: frameFile?.url || null,
//       frameFilePublicId: frameFile?.public_id || null,
//     });

//     const populated = await MyCreation.findById(creation._id)
//       .populate("user")
//       .populate("category");

//     return res.status(201).json({
//       success: true,
//       creation: populated,
//     });
//   } catch (err) {
//     console.error("❌ Create MyCreation Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while creating",
//     });
//   }
// };

// /* =====================================================
//    GET ALL MY CREATIONS (ADMIN)
// ===================================================== */
// exports.getAllMyCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find()
//       .populate("user")
//       .populate("category")
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, creations });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch creations",
//     });
//   }
// };

// /* =====================================================
//    GET APPROVED CREATIONS (PUBLIC)
// ===================================================== */
// exports.getApprovedCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find({ status: "approved" })
//       .populate("user")
//       .populate("category")
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, creations });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch approved creations",
//     });
//   }
// };

// /* =====================================================
//    UPDATE STATUS (ADMIN)
// ===================================================== */
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminComment } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     const creation = await MyCreation.findById(id).populate("category");
//     if (!creation) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     /* ---------- FESTIVAL → DAY SPECIAL ---------- */
//     if (status === "approved" && creation.category?.isFestivalCategory) {
//       const daySpecial = await Category.findOne({
//         name: { $regex: "^Day Special$", $options: "i" },
//         status: "active",
//       });
//       if (daySpecial) creation.category = daySpecial._id;
//     }

//     creation.status = status;
//     creation.adminComment = adminComment || "";
//     await creation.save();

//     const populated = await MyCreation.findById(id)
//       .populate("user")
//       .populate("category");

//     return res.json({ success: true, creation: populated });
//   } catch (err) {
//     console.error("❌ Update Status Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update status",
//     });
//   }
// };

// /* =====================================================
//    DELETE MY CREATION
// ===================================================== */
// exports.deleteMyCreation = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await MyCreation.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     /* ---------- CLOUDINARY CLEANUP ---------- */
//     try {
//       if (deleted.filePublicId) {
//         await cloudinary.uploader.destroy(deleted.filePublicId, {
//           resource_type: "auto",
//         });
//       }
//       if (deleted.frameFilePublicId) {
//         await cloudinary.uploader.destroy(deleted.frameFilePublicId, {
//           resource_type: "image",
//         });
//       }
//     } catch (e) {
//       console.warn("⚠ Cloudinary cleanup failed");
//     }

//     return res.json({
//       success: true,
//       message: "Deleted successfully",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete creation",
//     });
//   }
// };

// const MyCreation = require("../models/MyCreation");
// const Category = require("../models/categoryModel");
// const User = require("../models/User");
// const cloudinary = require("../config/cloudinary");

// /* =====================================================
//    HELPER : FILE INFO (Cloudinary / Multer)
// ===================================================== */
// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj || !filesObj[fieldName]?.length) return null;

//   const f = filesObj[fieldName][0];
//   return {
//     url: f.path || f.secure_url || f.url || null,
//     public_id: f.filename || f.public_id || f.publicId || null,
//   };
// };

// /* =====================================================
//    CREATE MY CREATION (USER UPLOAD)
// ===================================================== */
// exports.createMyCreation = async (req, res) => {
//   try {
//     /* 🔐 USER FROM JWT (IMPORTANT FIX) */
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const {
//       title,
//       description,
//       type,
//       category,
//       orientation,
//       profilePosition,
//       transitionType,
//     } = req.body;

//     /* ---------- BASIC VALIDATION ---------- */
//     if (!title) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     /* ---------- FILE VALIDATION ---------- */
//     const mainFile = getFileInfo(req.files, "file");
//     const frameFile = getFileInfo(req.files, "frameFile");

//     if (!mainFile) {
//       return res.status(400).json({
//         success: false,
//         message: "Main file is required",
//       });
//     }

//     /* ---------- FETCH USER ---------- */
//     const userDoc = await User.findById(userId).select("name");
//     if (!userDoc) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user",
//       });
//     }

//     /* ---------- CATEGORY STRING → OBJECT ID ---------- */
//     let categoryId = null;
//     if (category && typeof category === "string") {
//       const categoryDoc = await Category.findOne({
//         name: { $regex: `^${category.trim()}$`, $options: "i" },
//         status: "active",
//       });

//       if (!categoryDoc) {
//         return res.status(400).json({
//           success: false,
//           message: `Category '${category}' not found or inactive`,
//         });
//       }

//       categoryId = categoryDoc._id;
//     }

//     /* ---------- CREATE DOCUMENT ---------- */
//     const creation = await MyCreation.create({
//       user: userId,
//       contentOwnerName: userDoc.name?.trim() || "",
//       title: title.trim(),
//       description: description || "",
//       type: type || "video",
//       category: categoryId,
//       orientation: orientation || "landscape",
//       profilePosition: profilePosition || "center",
//       transitionType: transitionType || "fade",
//       file: mainFile.url,
//       filePublicId: mainFile.public_id,
//       frameFile: frameFile?.url || null,
//       frameFilePublicId: frameFile?.public_id || null,
//     });

//     const populated = await MyCreation.findById(creation._id)
//       .populate("user")
//       .populate("category");

//     return res.status(201).json({
//       success: true,
//       creation: populated,
//     });
//   } catch (err) {
//     console.error("❌ Create MyCreation Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while creating",
//     });
//   }
// };

// /* =====================================================
//    GET ALL MY CREATIONS (ADMIN ONLY)
// ===================================================== */
// exports.getAllMyCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find({
//       user: { $ne: null },
//       file: { $ne: null },
//     })
//       .populate("user")
//       .populate("category")
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, creations });
//   } catch (err) {
//     console.error("❌ Get All Creations Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch creations",
//     });
//   }
// };

// /* =====================================================
//    GET APPROVED CREATIONS (PUBLIC)
// ===================================================== */
// exports.getApprovedCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find({
//       status: "approved",
//       file: { $ne: null },
//     })
//       .populate("user")
//       .populate("category")
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, creations });
//   } catch (err) {
//     console.error("❌ Get Approved Creations Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch approved creations",
//     });
//   }
// };

// /* =====================================================
//    UPDATE STATUS (ADMIN ONLY)
// ===================================================== */
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminComment } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     const creation = await MyCreation.findById(id).populate("category");
//     if (!creation) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     if (status === "approved" && creation.category?.isFestivalCategory) {
//       const daySpecial = await Category.findOne({
//         name: { $regex: "^Day Special$", $options: "i" },
//         status: "active",
//       });
//       if (daySpecial) creation.category = daySpecial._id;
//     }

//     creation.status = status;
//     creation.adminComment = adminComment || "";
//     await creation.save();

//     const populated = await MyCreation.findById(id)
//       .populate("user")
//       .populate("category");

//     return res.json({ success: true, creation: populated });
//   } catch (err) {
//     console.error("❌ Update Status Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update status",
//     });
//   }
// };

// /* =====================================================
//    DELETE MY CREATION (ADMIN ONLY)
// ===================================================== */
// exports.deleteMyCreation = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await MyCreation.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     try {
//       if (deleted.filePublicId) {
//         await cloudinary.uploader.destroy(deleted.filePublicId, {
//           resource_type: "auto",
//         });
//       }
//       if (deleted.frameFilePublicId) {
//         await cloudinary.uploader.destroy(deleted.frameFilePublicId, {
//           resource_type: "image",
//         });
//       }
//     } catch {
//       console.warn("⚠ Cloudinary cleanup failed");
//     }

//     return res.json({
//       success: true,
//       message: "Deleted successfully",
//     });
//   } catch (err) {
//     console.error("❌ Delete Creation Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete creation",
//     });
//   }
// };

// const MyCreation = require("../models/MyCreation");
// const Category = require("../models/categoryModel");
// const User = require("../models/User");
// const cloudinary = require("../config/cloudinary");

// /* =====================================================
//    HELPER : FILE INFO
// ===================================================== */
// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj || !filesObj[fieldName]?.length) return null;

//   const f = filesObj[fieldName][0];
//   return {
//     url: f.path || f.secure_url || null,
//     public_id: f.filename || f.public_id || null,
//   };
// };

// /* =====================================================
//    CREATE MY CREATION (USER UPLOAD)
// ===================================================== */
// exports.createMyCreation = async (req, res) => {
//   try {
//     // 🔥 SUPPORT OLD MODE (query based user)
//     const userId = req.user?._id || req.body.user;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const {
//       title,
//       description = "",
//       type = "video",
//       category,
//       orientation = "landscape",
//       profilePosition = "center",
//       transitionType = "fade",
//     } = req.body;

//     if (!title) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     const mainFile = getFileInfo(req.files, "file");
//     const frameFile = getFileInfo(req.files, "frameFile");

//     if (!mainFile) {
//       return res.status(400).json({
//         success: false,
//         message: "Main file is required",
//       });
//     }

//     const userDoc = await User.findById(userId).select("name");
//     if (!userDoc) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user",
//       });
//     }

//     /* ===== CATEGORY ===== */
//     let categoryId = null;
//     if (category) {
//       const cat = await Category.findOne({
//         name: { $regex: `^${category.trim()}$`, $options: "i" },
//         status: "active",
//       });

//       if (!cat) {
//         return res.status(400).json({
//           success: false,
//           message: `Category '${category}' not found`,
//         });
//       }
//       categoryId = cat._id;
//     }

//     const creation = await MyCreation.create({
//       user: userId,
//       contentOwnerName: userDoc.name,
//       title: title.trim(),
//       description,
//       type,
//       category: categoryId,
//       orientation,
//       profilePosition,
//       transitionType,

//       file: mainFile.url,
//       filePublicId: mainFile.public_id,
//       frameFile: frameFile?.url || null,
//       frameFilePublicId: frameFile?.public_id || null,

//       status: "pending",
//     });

//     const populated = await MyCreation.findById(creation._id)
//       .populate("user", "name email")
//       .populate("category", "name");

//     return res.status(201).json({
//       success: true,
//       creation: populated,
//     });
//   } catch (err) {
//     console.error("❌ Create Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create",
//     });
//   }
// };

// /* =====================================================
//    GET ALL CREATIONS (ADMIN PANEL)
// ===================================================== */
// exports.getAllMyCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find({})
//       .populate("user", "name email")
//       .populate("category", "name")
//       .sort({ createdAt: -1 });

//     return res.json({
//       success: true,
//       creations,
//     });
//   } catch (err) {
//     console.error("❌ Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch creations",
//     });
//   }
// };

// /* =====================================================
//    GET APPROVED CREATIONS (PUBLIC)
// ===================================================== */
// exports.getApprovedCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find({ status: "approved" })
//       .populate("user", "name")
//       .populate("category", "name")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       creations,
//     });
//   } catch (err) {
//     console.error("❌ Approved Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch approved",
//     });
//   }
// };

// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminComment = "" } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     // 👇 IMPORTANT: populate category
//     const creation = await MyCreation.findById(id).populate("category");
//     if (!creation) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     /* 🔥 AUTO CATEGORY SWITCH LOGIC */
//     if (
//       status === "approved" &&
//       creation.category?.name === "Festival"
//     ) {
//       const daySpecial = await Category.findOne({
//         name: "Day Special",
//         status: "active",
//       });

//       if (daySpecial) {
//         creation.category = daySpecial._id;
//       }
//     }

//     creation.status = status;
//     creation.adminComment = adminComment;
//     await creation.save();

//     const populated = await MyCreation.findById(id)
//       .populate("user", "name email")
//       .populate("category", "name");

//     return res.json({
//       success: true,
//       creation: populated,
//     });
//   } catch (err) {
//     console.error("❌ Status Update Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update status",
//     });
//   }
// };

// /* =====================================================
//    DELETE CREATION
// ===================================================== */
// exports.deleteMyCreation = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await MyCreation.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     try {
//       if (deleted.filePublicId) {
//         await cloudinary.uploader.destroy(deleted.filePublicId, {
//           resource_type: "auto",
//         });
//       }
//       if (deleted.frameFilePublicId) {
//         await cloudinary.uploader.destroy(deleted.frameFilePublicId);
//       }
//     } catch {
//       console.warn("⚠ Cloudinary cleanup failed");
//     }

//     res.json({
//       success: true,
//       message: "Deleted successfully",
//     });
//   } catch (err) {
//     console.error("❌ Delete Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete",
//     });
//   }
// };

// const MyCreation = require("../models/MyCreation");
// const Category = require("../models/categoryModel");
// const User = require("../models/User");
// const cloudinary = require("../config/cloudinary");

// /* =====================================================
//    HELPER : FILE INFO
// ===================================================== */
// // const getFileInfo = (filesObj, fieldName) => {
// //   if (!filesObj || !filesObj[fieldName]?.length) return null;

// //   const f = filesObj[fieldName][0];
// //   return {
// //     url: f.path || f.secure_url || null,
// //     public_id: f.filename || f.public_id || null,
// //   };
// // };

// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj || !filesObj[fieldName]) return null;

//   const f = filesObj[fieldName][0];
//   return {
//     url: f.path || f.secure_url,
//     public_id: f.filename || f.public_id,
//   };
// };


// /* =====================================================
//    CREATE MY CREATION (USER UPLOAD)
// ===================================================== */
// exports.createMyCreation = async (req, res) => {
//   try {
//     // 🔐 JWT user
//     const userId = req.user._id;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const {
//       title,
//       description = "",
//       type = "video",
//       category,
//       orientation = "landscape",
//       profilePosition = "center",
//       transitionType = "fade",
//     } = req.body;

//     if (!title) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     const mainFile = getFileInfo(req.files, "file");
//     const frameFile = getFileInfo(req.files, "frameFile");

//     if (!mainFile) {
//       return res.status(400).json({
//         success: false,
//         message: "Main file is required",
//       });
//     }

//     // 🔐 Get user name from JWT user
//     const userDoc = await User.findById(userId).select("name");
//     if (!userDoc) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user",
//       });
//     }

//     /* ===== CATEGORY ===== */
//     let categoryId = null;
//     if (category) {
//       const cat = await Category.findOne({
//         name: { $regex: `^${category.trim()}$`, $options: "i" },
//         status: "active",
//       });

//       if (!cat) {
//         return res.status(400).json({
//           success: false,
//           message: `Category '${category}' not found`,
//         });
//       }
//       categoryId = cat._id;
//     }

//     const creation = await MyCreation.create({
//       user: userId,
//       contentOwnerName: userDoc.name,
//       title: title.trim(),
//       description,
//       type,
//       category: categoryId,
//       orientation,
//       profilePosition,
//       transitionType,

//       file: mainFile.url,
//       filePublicId: mainFile.public_id,
//       frameFile: frameFile?.url || null,
//       frameFilePublicId: frameFile?.public_id || null,

//       status: "pending",
//     });

//     const populated = await MyCreation.findById(creation._id)
//       .populate("user", "name email")
//       .populate("category", "name");

//     return res.status(201).json({
//       success: true,
//       creation: populated,
//     });
//   } catch (err) {
//     console.error("❌ Create Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create",
//     });
//   }
// };

// /* =====================================================
//    GET ALL CREATIONS (ADMIN PANEL)
// ===================================================== */
// exports.getAllMyCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find({})
//       .populate("user", "name email")
//       .populate("category", "name")
//       .sort({ createdAt: -1 });

//     return res.json({
//       success: true,
//       creations,
//     });
//   } catch (err) {
//     console.error("❌ Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch creations",
//     });
//   }
// };

// /* =====================================================
//    GET APPROVED CREATIONS (PUBLIC)
// ===================================================== */
// exports.getApprovedCreations = async (req, res) => {
//   try {
//     const creations = await MyCreation.find({ status: "approved" })
//       .populate("user", "name")
//       .populate("category", "name")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       creations,
//     });
//   } catch (err) {
//     console.error("❌ Approved Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch approved",
//     });
//   }
// };

// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminComment = "" } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     const creation = await MyCreation.findById(id).populate("category");
//     if (!creation) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     if (status === "approved" && creation.category?.name === "Festival") {
//       const daySpecial = await Category.findOne({
//         name: "Day Special",
//         status: "active",
//       });

//       if (daySpecial) {
//         creation.category = daySpecial._id;
//       }
//     }

//     creation.status = status;
//     creation.adminComment = adminComment;
//     await creation.save();

//     const populated = await MyCreation.findById(id)
//       .populate("user", "name email")
//       .populate("category", "name");

//     return res.json({
//       success: true,
//       creation: populated,
//     });
//   } catch (err) {
//     console.error("❌ Status Update Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update status",
//     });
//   }
// };

// /* =====================================================
//    DELETE CREATION
// ===================================================== */
// exports.deleteMyCreation = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await MyCreation.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     try {
//       if (deleted.filePublicId) {
//         await cloudinary.uploader.destroy(deleted.filePublicId, {
//           resource_type: "auto",
//         });
//       }
//       if (deleted.frameFilePublicId) {
//         await cloudinary.uploader.destroy(deleted.frameFilePublicId);
//       }
//     } catch {
//       console.warn("⚠ Cloudinary cleanup failed");
//     }

//     res.json({
//       success: true,
//       message: "Deleted successfully",
//     });
//   } catch (err) {
//     console.error("❌ Delete Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete",
//     });
//   }
// };


const MyCreation = require("../models/MyCreation");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const Template = require("../models/templateModel");

/* =====================================================
   SAFE FILE HELPER
===================================================== */
const getFileInfo = (filesObj, fieldName) => {
  if (!filesObj || !filesObj[fieldName]) return null;

  const f = filesObj[fieldName][0];
  return {
    url: f.path || f.secure_url || null,
    public_id: f.filename || f.public_id || null,
  };
};

/* =====================================================
   CREATE MY CREATION
===================================================== */
exports.createMyCreation = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      title,
      description = "",
      type = "video",
      category = "",
      orientation = "landscape",
      profilePosition = "center",
      transitionType = "fade",
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const mainFile = getFileInfo(req.files, "file");
    const frameFile = getFileInfo(req.files, "frameFile");

    if (!mainFile || !mainFile.url) {
      return res.status(400).json({
        success: false,
        message: "Main file upload failed",
      });
    }

    const userDoc = await User.findById(userId).select("name");
    if (!userDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }

    const creation = await MyCreation.create({
      user: userId,
      contentOwnerName: userDoc.name || "",
      title: title.trim(),
      description,
      type,
      category: category.trim(),   // ✅ STRING SAVED
      orientation,
      profilePosition,
      transitionType,

      file: mainFile.url,
      filePublicId: mainFile.public_id,

      frameFile: frameFile?.url || null,
      frameFilePublicId: frameFile?.public_id || null,

      status: "pending",
    });

    return res.status(201).json({
      success: true,
      creation,
    });
  } catch (err) {
    console.error("❌ Create Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create",
    });
  }
};

/* =====================================================
   GET ALL (ADMIN)
===================================================== */
exports.getAllMyCreations = async (req, res) => {
  try {
    const creations = await MyCreation.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      creations,
    });
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch creations",
    });
  }
};

/* =====================================================
   GET APPROVED (PUBLIC)
===================================================== */
exports.getApprovedCreations = async (req, res) => {
  try {
    const creations = await MyCreation.find({ status: "approved" })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      creations,
    });
  } catch (err) {
    console.error("❌ Approved Fetch Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch approved",
    });
  }
};

/* =====================================================
   UPDATE STATUS
===================================================== */
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminComment = "" } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     const creation = await MyCreation.findById(id);
//     if (!creation) {
//       return res.status(404).json({
//         success: false,
//         message: "Creation not found",
//       });
//     }

//     creation.status = status;
//     creation.adminComment = adminComment;
//     await creation.save();

//     return res.json({
//       success: true,
//       creation,
//     });
//   } catch (err) {
//     console.error("❌ Status Update Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update status",
//     });
//   }
// };

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminComment = "" } = req.body;

    // ✅ status validation
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // ✅ find creation
    const creation = await MyCreation.findById(id);
    if (!creation) {
      return res.status(404).json({
        success: false,
        message: "Creation not found",
      });
    }

    // ✅ update status
    creation.status = status;
    creation.adminComment = adminComment;
    await creation.save();

    /* =====================================================
       🔥 APPROVE HOTE HI TEMPLATE AUTO CREATE
    ===================================================== */
    if (status === "approved") {
      // 🔒 duplicate template se bachao
      const exists = await Template.findOne({
        sourceCreation: creation._id,
      });

      if (!exists) {
        await Template.create({
          title: creation.title,
          type: creation.type || "video",
          status: "active",

          // files
          file: creation.file,
          frameFile: creation.frameFile,

          // orientation
          orientation: creation.orientation || "landscape",

          // profile settings
          profile: {
            position: creation.profilePosition || "center",
            size: "120px",
            shape: "circle",
          },

          // transition settings
          transition: {
            placement: "below",
            type: creation.transitionType || "fade",
            duration: 0.8,
          },

          // 🔗 link with MyCreation
          sourceCreation: creation._id,
          createdBy: creation.user,
        });
      }
    }

    // ✅ final response
    return res.json({
      success: true,
      creation,
    });

  } catch (err) {
    console.error("❌ Status Update Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};


/* =====================================================
   DELETE CREATION
===================================================== */
exports.deleteMyCreation = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await MyCreation.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Creation not found",
      });
    }

    try {
      if (deleted.filePublicId) {
        await cloudinary.uploader.destroy(deleted.filePublicId, {
          resource_type: "auto",
        });
      }
      if (deleted.frameFilePublicId) {
        await cloudinary.uploader.destroy(deleted.frameFilePublicId);
      }
    } catch (e) {
      console.warn("⚠ Cloudinary cleanup failed");
    }

    return res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};
/* =====================================================
   👤 USER → MY APPROVED CREATIONS
===================================================== */
exports.getMyApprovedCreations = async (req, res) => {
  try {
    const userId = req.user._id;

    const creations = await MyCreation.find({
      user: userId,
      status: "approved",
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      creations,
    });
  } catch (err) {
    console.error("❌ My Approved Fetch Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch approved creations",
    });
  }
};
