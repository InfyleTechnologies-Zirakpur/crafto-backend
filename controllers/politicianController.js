// // // // <<<<<<< HEAD
// // // // // const Politician = require("../models/politicianModel");
// // // // // const cloudinary = require("../config/cloudinary");

// // // // // // GET all politicians
// // // // // exports.getPoliticians = async (req, res) => {
// // // // //   try {
// // // // //     const politicians = await Politician.find().sort({ createdAt: -1 });
// // // // //     res.json({ success: true, politicians });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ success: false, message: err.message });
// // // // //   }
// // // // // };

// // // // // // CREATE politician
// // // // // exports.createPolitician = async (req, res) => {
// // // // //   try {
// // // // //     const { title, abbreviation, status } = req.body;
// // // // //     if (!title || !abbreviation) {
// // // // //       return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
// // // // //     }

// // // // //     let logoUrl = null;
// // // // //     if (req.file) {
// // // // //       const result = await cloudinary.uploader.upload(req.file.path, {
// // // // //         folder: "politicians",
// // // // //         allowed_formats: ["jpg","jpeg","png","webp"],
// // // // //       });
// // // // //       logoUrl = result.secure_url;
// // // // //     }

// // // // //     const politician = await Politician.create({ title, abbreviation, status, logo: logoUrl });
// // // // //     res.json({ success: true, politician });
// // // // //   } catch (err) {
// // // // //     console.error("❌ Politician Create Error:", err);
// // // // //     res.status(500).json({ success: false, message: err.message });
// // // // //   }
// // // // // };

// // // // // // UPDATE politician
// // // // // exports.updatePolitician = async (req, res) => {
// // // // //   try {
// // // // //     const { title, abbreviation, status } = req.body;
// // // // //     if (!title || !abbreviation) {
// // // // //       return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
// // // // //     }

// // // // //     let updateData = { title, abbreviation, status };

// // // // //     if (req.file) {
// // // // //       const result = await cloudinary.uploader.upload(req.file.path, {
// // // // //         folder: "politicians",
// // // // //         allowed_formats: ["jpg","jpeg","png","webp"],
// // // // //       });
// // // // //       updateData.logo = result.secure_url;
// // // // //     }

// // // // //     const updated = await Politician.findByIdAndUpdate(req.params.id, updateData, { new: true });
// // // // //     if (!updated) return res.status(404).json({ success: false, message: "Politician not found" });

// // // // //     res.json({ success: true, politician: updated });
// // // // //   } catch (err) {
// // // // //     console.error("❌ Politician Update Error:", err);
// // // // //     res.status(500).json({ success: false, message: err.message });
// // // // //   }
// // // // // };

// // // // // // DELETE politician
// // // // // exports.deletePolitician = async (req, res) => {
// // // // //   try {
// // // // //     const deleted = await Politician.findByIdAndDelete(req.params.id);
// // // // //     if (!deleted) return res.status(404).json({ success: false, message: "Politician not found" });
// // // // //     res.json({ success: true, message: "Politician deleted successfully" });
// // // // //   } catch (err) {
// // // // //     console.error("❌ Politician Delete Error:", err);
// // // // //     res.status(500).json({ success: false, message: err.message });
// // // // //   }
// // // // // };
// // // // const Politician = require("../models/politicianModel");
// // // // const cloudinary = require("cloudinary").v2;

// // // // // ✅ Create Politician
// // // // exports.createPolitician = async (req, res) => {
// // // //   try {
// // // //     const { title, abbreviation, status, religious, language } = req.body;
// // // //     let logo = null;

// // // //     if (req.file) {
// // // //       const result = await cloudinary.uploader.upload(req.file.path, {
// // // //         folder: "politicians",
// // // //       });
// // // //       logo = result.secure_url;
// // // //     }

// // // //     const politician = await Politician.create({
// // // //       title,
// // // //       abbreviation,
// // // //       logo,
// // // //       status,
// // // //       religious,
// // // //       language,
// // // //     });

// // // //     res.status(201).json(politician);
// // // //   } catch (error) {
// // // //     console.error("Error creating politician:", error);
// // // //     res.status(500).json({ message: "Server error" });
// // // //   }
// // // // };

// // // // // ✅ Get All Politicians
// // // // exports.getPoliticians = async (req, res) => {
// // // //   try {
// // // //     const politicians = await Politician.find()
// // // //       .populate("religious")
// // // //       .populate("language");
// // // //     res.json({ success: true, politicians });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: "Failed to fetch" });
// // // //   }
// // // // };

// // // // // ✅ Update Politician
// // // // exports.updatePolitician = async (req, res) => {
// // // //   try {
// // // //     const { title, abbreviation, status, religious, language } = req.body;
// // // //     const updateData = { title, abbreviation, status, religious, language };
// // // // =======
// // // // const Politician = require("../models/politicianModel");
// // // // const cloudinary = require("../config/cloudinary");

// // // // // GET all politicians
// // // // exports.getPoliticians = async (req, res) => {
// // // //   try {
// // // //     const politicians = await Politician.find().sort({ createdAt: -1 });
// // // //     res.json({ success: true, politicians });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, message: err.message });
// // // //   }
// // // // };

// // // // // CREATE politician
// // // // exports.createPolitician = async (req, res) => {
// // // //   try {
// // // //     const { title, abbreviation, status } = req.body;
// // // //     if (!title || !abbreviation) {
// // // //       return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
// // // //     }

// // // //     let logoUrl = null;
// // // //     if (req.file) {
// // // //       const result = await cloudinary.uploader.upload(req.file.path, {
// // // //         folder: "politicians",
// // // //         allowed_formats: ["jpg","jpeg","png","webp"],
// // // //       });
// // // //       logoUrl = result.secure_url;
// // // //     }

// // // //     const politician = await Politician.create({ title, abbreviation, status, logo: logoUrl });
// // // //     res.json({ success: true, politician });
// // // //   } catch (err) {
// // // //     console.error("❌ Politician Create Error:", err);
// // // //     res.status(500).json({ success: false, message: err.message });
// // // //   }
// // // // };

// // // // // UPDATE politician
// // // // exports.updatePolitician = async (req, res) => {
// // // //   try {
// // // //     const { title, abbreviation, status } = req.body;
// // // //     if (!title || !abbreviation) {
// // // //       return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
// // // //     }

// // // //     let updateData = { title, abbreviation, status };
// // // // >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e

// // // //     if (req.file) {
// // // //       const result = await cloudinary.uploader.upload(req.file.path, {
// // // //         folder: "politicians",
// // // // <<<<<<< HEAD
// // // // =======
// // // //         allowed_formats: ["jpg","jpeg","png","webp"],
// // // // >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// // // //       });
// // // //       updateData.logo = result.secure_url;
// // // //     }

// // // // <<<<<<< HEAD
// // // //     const politician = await Politician.findByIdAndUpdate(
// // // //       req.params.id,
// // // //       updateData,
// // // //       { new: true }
// // // //     );

// // // //     res.json(politician);
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: "Update failed" });
// // // //   }
// // // // };

// // // // // ✅ Delete Politician
// // // // exports.deletePolitician = async (req, res) => {
// // // //   try {
// // // //     await Politician.findByIdAndDelete(req.params.id);
// // // //     res.json({ success: true, message: "Deleted successfully" });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: "Delete failed" });
// // // //   }
// // // // };
// // // // =======
// // // //     const updated = await Politician.findByIdAndUpdate(req.params.id, updateData, { new: true });
// // // //     if (!updated) return res.status(404).json({ success: false, message: "Politician not found" });

// // // //     res.json({ success: true, politician: updated });
// // // //   } catch (err) {
// // // //     console.error("❌ Politician Update Error:", err);
// // // //     res.status(500).json({ success: false, message: err.message });
// // // //   }
// // // // };

// // // // // DELETE politician
// // // // exports.deletePolitician = async (req, res) => {
// // // //   try {
// // // //     const deleted = await Politician.findByIdAndDelete(req.params.id);
// // // //     if (!deleted) return res.status(404).json({ success: false, message: "Politician not found" });
// // // //     res.json({ success: true, message: "Politician deleted successfully" });
// // // //   } catch (err) {
// // // //     console.error("❌ Politician Delete Error:", err);
// // // //     res.status(500).json({ success: false, message: err.message });
// // // //   }

// // // // };
// // // // >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// // // const Politician = require("../models/politicianModel");
// // // const cloudinary = require("cloudinary").v2;

// // // // ✅ Create Politician
// // // exports.createPolitician = async (req, res) => {
// // //   try {
// // //     const { title, abbreviation, status, religious, language } = req.body;
// // //     if (!title || !abbreviation) {
// // //       return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
// // //     }

// // //     let logo = null;
// // //     if (req.file) {
// // //       const result = await cloudinary.uploader.upload(req.file.path, {
// // //         folder: "politicians",
// // //         allowed_formats: ["jpg", "jpeg", "png", "webp"],
// // //       });
// // //       logo = result.secure_url;
// // //     }

// // //     const politician = await Politician.create({
// // //       title,
// // //       abbreviation,
// // //       status,
// // //       religious,
// // //       language,
// // //       logo,
// // //     });

// // //     res.status(201).json({ success: true, politician });
// // //   } catch (error) {
// // //     console.error("❌ Politician Create Error:", error);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // };

// // // // ✅ Get All Politicians
// // // exports.getPoliticians = async (req, res) => {
// // //   try {
// // //     const politicians = await Politician.find()
// // //       .populate("religious")
// // //       .populate("language")
// // //       .sort({ createdAt: -1 });

// // //     res.json({ success: true, politicians });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "Failed to fetch politicians" });
// // //   }
// // // };

// // // // ✅ Update Politician
// // // exports.updatePolitician = async (req, res) => {
// // //   try {
// // //     const { title, abbreviation, status, religious, language } = req.body;
// // //     if (!title || !abbreviation) {
// // //       return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
// // //     }

// // //     const updateData = { title, abbreviation, status, religious, language };

// // //     if (req.file) {
// // //       const result = await cloudinary.uploader.upload(req.file.path, {
// // //         folder: "politicians",
// // //         allowed_formats: ["jpg", "jpeg", "png", "webp"],
// // //       });
// // //       updateData.logo = result.secure_url;
// // //     }

// // //     const updated = await Politician.findByIdAndUpdate(req.params.id, updateData, { new: true });
// // //     if (!updated) return res.status(404).json({ success: false, message: "Politician not found" });

// // //     res.json({ success: true, politician: updated });
// // //   } catch (error) {
// // //     console.error("❌ Politician Update Error:", error);
// // //     res.status(500).json({ success: false, message: "Update failed" });
// // //   }
// // // };

// // // // ✅ Delete Politician
// // // exports.deletePolitician = async (req, res) => {
// // //   try {
// // //     const deleted = await Politician.findByIdAndDelete(req.params.id);
// // //     if (!deleted) return res.status(404).json({ success: false, message: "Politician not found" });

// // //     res.json({ success: true, message: "Politician deleted successfully" });
// // //   } catch (error) {
// // //     console.error("❌ Politician Delete Error:", error);
// // //     res.status(500).json({ success: false, message: "Delete failed" });
// // //   }
// // // };


// // const Politician = require("../models/politicianModel");

// // // CREATE
// // exports.createPolitician = async (req, res) => {
// //   try {
// //     const { title, abbreviation, status, religious, language } = req.body;

// //     if (!title || !abbreviation) {
// //       return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
// //     }

// //     const politician = await Politician.create({
// //       title,
// //       abbreviation,
// //       status,
// //       religious,
// //       language,
// //       logo: req.file ? req.file.path : null, // Cloudinary URL
// //     });

// //     res.status(201).json({ success: true, politician });
// //   } catch (error) {
// //     console.error("Create Error:", error);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // };

// // // GET with pagination + search
// // exports.getPoliticians = async (req, res) => {
// //   try {
// //     const { search = "", page = 1, limit = 10 } = req.query;

// //     const query = search ? { title: { $regex: search, $options: "i" } } : {};

// //     const skip = (page - 1) * limit;

// //     const [politicians, total] = await Promise.all([
// //       Politician.find(query)
// //         .populate("religious")
// //         .populate("language")
// //         .sort({ createdAt: -1 })
// //         .skip(skip)
// //         .limit(Number(limit)),
// //       Politician.countDocuments(query),
// //     ]);

// //     res.json({
// //       success: true,
// //       politicians,
// //       total,
// //       page: Number(page),
// //       pages: Math.ceil(total / limit),
// //     });
// //   } catch (error) {
// //     console.error("Fetch Error:", error);
// //     res.status(500).json({ success: false, message: "Failed to fetch politicians" });
// //   }
// // };

// // // UPDATE
// // exports.updatePolitician = async (req, res) => {
// //   try {
// //     const { title, abbreviation, status, religious, language } = req.body;

// //     const updateData = { title, abbreviation, status, religious, language };

// //     if (req.file) updateData.logo = req.file.path;

// //     const updated = await Politician.findByIdAndUpdate(req.params.id, updateData, { new: true });

// //     res.json({ success: true, politician: updated });
// //   } catch (error) {
// //     console.error("Update Error:", error);
// //     res.status(500).json({ success: false, message: "Update failed" });
// //   }
// // };

// // // DELETE
// // exports.deletePolitician = async (req, res) => {
// //   try {
// //     await Politician.findByIdAndDelete(req.params.id);
// //     res.json({ success: true, message: "Politician deleted" });
// //   } catch (error) {
// //     console.error("Delete Error:", error);
// //     res.status(500).json({ success: false, message: "Delete failed" });
// //   }
// // };



// // const Politician = require("../models/politicianModel");
// // const { v2: cloudinary } = require("cloudinary");

// // // =============================================================
// // // 📌 GET — List Politicians (pagination + search)
// // // =============================================================
// // exports.getPoliticians = async (req, res) => {
// //   try {
// //     const { search = "", page = 1, limit = 10 } = req.query;

// //     const query = search ? { title: { $regex: search, $options: "i" } } : {};

// //     const skip = (page - 1) * Number(limit);

// //     const [politicians, total] = await Promise.all([
// //       Politician.find(query)
// //         .populate("religious")
// //         .populate("language")
// //         .sort({ createdAt: -1 })
// //         .skip(skip)
// //         .limit(Number(limit)),
// //       Politician.countDocuments(query),
// //     ]);

// //     res.json({
// //       success: true,
// //       politicians,
// //       total,
// //       page: Number(page),
// //       pages: Math.ceil(total / limit),
// //     });
// //   } catch (error) {
// //     console.error("❌ Fetch Error:", error);
// //     res.status(500).json({ success: false, message: "Failed to fetch politicians" });
// //   }
// // };

// // // =============================================================
// // // 📌 CREATE — Add Politician (Festival-style Controls)
// // // =============================================================
// // exports.createPolitician = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       abbreviation,
// //       status,
// //       religious,
// //       language,

// //       // LOGO Controls
// //       zoom,
// //       offsetX,
// //       offsetY,

// //       // BANNER Controls
// //       bannerZoom,
// //       bannerX,
// //       bannerY,
// //     } = req.body;

// //     if (!title || !abbreviation) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "Title & Abbreviation required" });
// //     }

// //     let logoUrl = "";
// //     let logoPublicId = "";

// //     let bannerUrl = "";
// //     let bannerPublicId = "";

// //     // ⭐ Multer Upload → LOGO
// //     if (req.files?.logo?.[0]) {
// //       logoUrl = req.files.logo[0].path;
// //       logoPublicId = req.files.logo[0].filename;
// //     }

// //     // ⭐ Multer Upload → BANNER
// //     if (req.files?.banner?.[0]) {
// //       bannerUrl = req.files.banner[0].path;
// //       bannerPublicId = req.files.banner[0].filename;
// //     }

// //     const politician = await Politician.create({
// //       title,
// //       abbreviation,
// //       status,
// //       religious,
// //       language,

// //       // LOGO
// //       logo: logoUrl,
// //       logoPublicId,
// //       zoom: Number(zoom),
// //       offsetX: Number(offsetX),
// //       offsetY: Number(offsetY),

// //       // BANNER
// //       banner: bannerUrl,
// //       bannerPublicId,
// //       bannerZoom: Number(bannerZoom),
// //       bannerX: Number(bannerX),
// //       bannerY: Number(bannerY),
// //     });

// //     res.status(201).json({ success: true, politician });
// //   } catch (error) {
// //     console.error("❌ Create Error:", error);
// //     res.status(500).json({ success: false, message: "Create failed" });
// //   }
// // };

// // // =============================================================
// // // 📌 UPDATE — Update Politician (Logo + Banner + Transform Controls)
// // // =============================================================
// // exports.updatePolitician = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       abbreviation,
// //       status,
// //       religious,
// //       language,

// //       // LOGO Controls
// //       zoom,
// //       offsetX,
// //       offsetY,

// //       // BANNER Controls
// //       bannerZoom,
// //       bannerX,
// //       bannerY,
// //     } = req.body;

// //     const politician = await Politician.findById(req.params.id);
// //     if (!politician)
// //       return res.status(404).json({ success: false, message: "Politician not found" });

// //     const update = {
// //       title,
// //       abbreviation,
// //       status,
// //       religious,
// //       language,

// //       // LOGO controls
// //       zoom: Number(zoom),
// //       offsetX: Number(offsetX),
// //       offsetY: Number(offsetY),

// //       // BANNER controls
// //       bannerZoom: Number(bannerZoom),
// //       bannerX: Number(bannerX),
// //       bannerY: Number(bannerY),
// //     };

// //     // ⭐ Replace LOGO
// //     if (req.files?.logo?.[0]) {
// //       if (politician.logoPublicId) {
// //         await cloudinary.uploader.destroy(politician.logoPublicId).catch(() => {});
// //       }
// //       update.logo = req.files.logo[0].path;
// //       update.logoPublicId = req.files.logo[0].filename;
// //     }

// //     // ⭐ Replace BANNER
// //     if (req.files?.banner?.[0]) {
// //       if (politician.bannerPublicId) {
// //         await cloudinary.uploader.destroy(politician.bannerPublicId).catch(() => {});
// //       }
// //       update.banner = req.files.banner[0].path;
// //       update.bannerPublicId = req.files.banner[0].filename;
// //     }

// //     const updated = await Politician.findByIdAndUpdate(req.params.id, update, {
// //       new: true,
// //     });

// //     res.json({ success: true, politician: updated });
// //   } catch (error) {
// //     console.error("❌ Update Error:", error);
// //     res.status(500).json({ success: false, message: "Update failed" });
// //   }
// // };

// // // =============================================================
// // // 📌 DELETE — Delete Politician + Cloudinary Cleanup
// // // =============================================================
// // exports.deletePolitician = async (req, res) => {
// //   try {
// //     const politician = await Politician.findById(req.params.id);
// //     if (!politician)
// //       return res.status(404).json({ success: false, message: "Not found" });

// //     // ⭐ Delete LOGO
// //     if (politician.logoPublicId) {
// //       await cloudinary.uploader.destroy(politician.logoPublicId).catch(() => {});
// //     }

// //     // ⭐ Delete BANNER
// //     if (politician.bannerPublicId) {
// //       await cloudinary.uploader.destroy(politician.bannerPublicId).catch(() => {});
// //     }

// //     await Politician.findByIdAndDelete(req.params.id);

// //     res.json({ success: true, message: "Politician deleted" });
// //   } catch (error) {
// //     console.error("❌ Delete Error:", error);
// //     res.status(500).json({ success: false, message: "Delete failed" });
// //   }
// // };

// const Politician = require("../models/politicianModel");
// const { v2: cloudinary } = require("cloudinary");

// /* =============================================================
//    📌 GET — List Politicians (pagination + search)
// ============================================================= */
// exports.getPoliticians = async (req, res) => {
//   try {
//     const { search = "", page = 1, limit = 10 } = req.query;

//     const query = search
//       ? { title: { $regex: search, $options: "i" } }
//       : {};

//     const skip = (page - 1) * Number(limit);

//     const [politicians, total] = await Promise.all([
//       Politician.find(query)
//         .populate("religious")
//         .populate("language")
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(Number(limit)),
//       Politician.countDocuments(query),
//     ]);

//     res.json({
//       success: true,
//       politicians,
//       total,
//       page: Number(page),
//       pages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     console.error("❌ Fetch Error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch politicians" });
//   }
// };

// /* =============================================================
//    📌 CREATE — Add Politician (IMAGE / VIDEO LOGO)
// ============================================================= */
// exports.createPolitician = async (req, res) => {
//   try {
//     const {
//       title,
//       abbreviation,
//       status,
//       religious,
//       language,
//       logoType = "image", // 🔥 image | video
//     } = req.body;

//     if (!title || !abbreviation) {
//       return res.status(400).json({
//         success: false,
//         message: "Title & Abbreviation required",
//       });
//     }

//     let logoUrl = null;
//     let logoPublicId = null;

//     let bannerUrl = null;
//     let bannerPublicId = null;

//     /* ⭐ LOGO UPLOAD */
//     if (req.files?.logo?.[0]) {
//       logoUrl = req.files.logo[0].path;
//       logoPublicId = req.files.logo[0].filename;
//     }

//     /* ⭐ BANNER UPLOAD */
//     if (req.files?.banner?.[0]) {
//       bannerUrl = req.files.banner[0].path;
//       bannerPublicId = req.files.banner[0].filename;
//     }

//     const politician = await Politician.create({
//       title,
//       abbreviation,
//       status,
//       religious,
//       language,

//       logo: logoUrl,
//       logoPublicId,
//       logoType, // 🔥 SAVE TYPE

//       banner: bannerUrl,
//       bannerPublicId,
//     });

//     res.status(201).json({
//       success: true,
//       politician,
//     });
//   } catch (error) {
//     console.error("❌ Create Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Create failed",
//     });
//   }
// };

// /* =============================================================
//    📌 UPDATE — Update Politician (IMAGE / VIDEO SAFE)
// ============================================================= */
// exports.updatePolitician = async (req, res) => {
//   try {
//     const {
//       title,
//       abbreviation,
//       status,
//       religious,
//       language,
//       logoType = "image",
//     } = req.body;

//     const politician = await Politician.findById(req.params.id);
//     if (!politician) {
//       return res.status(404).json({
//         success: false,
//         message: "Politician not found",
//       });
//     }

//     const update = {
//       title,
//       abbreviation,
//       status,
//       religious,
//       language,
//       logoType,
//     };

//     /* ⭐ REPLACE LOGO */
//     if (req.files?.logo?.[0]) {
//       // 🔥 DELETE OLD LOGO (image/video safe)
//       if (politician.logoPublicId) {
//         await cloudinary.uploader
//           .destroy(politician.logoPublicId, {
//             resource_type:
//               politician.logoType === "video" ? "video" : "image",
//           })
//           .catch(() => {});
//       }

//       update.logo = req.files.logo[0].path;
//       update.logoPublicId = req.files.logo[0].filename;
//     }

//     /* ⭐ REPLACE BANNER */
//     if (req.files?.banner?.[0]) {
//       if (politician.bannerPublicId) {
//         await cloudinary.uploader
//           .destroy(politician.bannerPublicId, {
//             resource_type: "image",
//           })
//           .catch(() => {});
//       }

//       update.banner = req.files.banner[0].path;
//       update.bannerPublicId = req.files.banner[0].filename;
//     }

//     const updated = await Politician.findByIdAndUpdate(
//       req.params.id,
//       update,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       politician: updated,
//     });
//   } catch (error) {
//     console.error("❌ Update Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Update failed",
//     });
//   }
// };

// /* =============================================================
//    📌 DELETE — Delete Politician (IMAGE / VIDEO SAFE)
// ============================================================= */
// exports.deletePolitician = async (req, res) => {
//   try {
//     const politician = await Politician.findById(req.params.id);
//     if (!politician) {
//       return res.status(404).json({
//         success: false,
//         message: "Not found",
//       });
//     }

//     /* ⭐ DELETE LOGO */
//     if (politician.logoPublicId) {
//       await cloudinary.uploader
//         .destroy(politician.logoPublicId, {
//           resource_type:
//             politician.logoType === "video" ? "video" : "image",
//         })
//         .catch(() => {});
//     }

//     /* ⭐ DELETE BANNER */
//     if (politician.bannerPublicId) {
//       await cloudinary.uploader
//         .destroy(politician.bannerPublicId, {
//           resource_type: "image",
//         })
//         .catch(() => {});
//     }

//     await Politician.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Politician deleted",
//     });
//   } catch (error) {
//     console.error("❌ Delete Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Delete failed",
//     });
//   }
// };


const Politician = require("../models/politicianModel");
const { v2: cloudinary } = require("cloudinary");

/* =============================================================
   📌 GET — List Politicians (pagination + search)
============================================================= */
exports.getPoliticians = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const skip = (page - 1) * Number(limit);

    const [politicians, total] = await Promise.all([
      Politician.find(query)
        .populate("religious")
        .populate("language")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Politician.countDocuments(query),
    ]);

    res.json({
      success: true,
      politicians,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch politicians" });
  }
};

/* =============================================================
   📌 CREATE — Add Politician (IMAGE / VIDEO LOGO)
============================================================= */
exports.createPolitician = async (req, res) => {
  try {
    const {
      title,
      abbreviation,
      status,
      religious,
      language,
      logoType = "image", // 🔥 image | video
    } = req.body;

    if (!title || !abbreviation) {
      return res.status(400).json({
        success: false,
        message: "Title & Abbreviation required",
      });
    }

    let logoUrl = null;
    let logoPublicId = null;

    let bannerUrl = null;
    let bannerPublicId = null;

    /* ⭐ LOGO UPLOAD */
    if (req.files?.logo?.[0]) {
      logoUrl = req.files.logo[0].path;
      logoPublicId = req.files.logo[0].filename;
    }

    /* ⭐ BANNER UPLOAD */
    if (req.files?.banner?.[0]) {
      bannerUrl = req.files.banner[0].path;
      bannerPublicId = req.files.banner[0].filename;
    }

    const politician = await Politician.create({
      title,
      abbreviation,
      status,
      religious,
      language,

      logo: logoUrl,
      logoPublicId,
      logoType, // 🔥 SAVE TYPE

      banner: bannerUrl,
      bannerPublicId,
    });

    res.status(201).json({
      success: true,
      politician,
    });
  } catch (error) {
    console.error("❌ Create Error:", error);
    res.status(500).json({
      success: false,
      message: "Create failed",
    });
  }
};

/* =============================================================
   📌 UPDATE — Update Politician (IMAGE / VIDEO SAFE)
============================================================= */
exports.updatePolitician = async (req, res) => {
  try {
    const {
      title,
      abbreviation,
      status,
      religious,
      language,
      logoType = "image",
    } = req.body;

    const politician = await Politician.findById(req.params.id);
    if (!politician) {
      return res.status(404).json({
        success: false,
        message: "Politician not found",
      });
    }

    const update = {
      title,
      abbreviation,
      status,
      religious,
      language,
      logoType,
    };

    /* ⭐ REPLACE LOGO */
    if (req.files?.logo?.[0]) {
      // 🔥 DELETE OLD LOGO (image/video safe)
      if (politician.logoPublicId) {
        await cloudinary.uploader
          .destroy(politician.logoPublicId, {
            resource_type:
              politician.logoType === "video" ? "video" : "image",
          })
          .catch(() => {});
      }

      update.logo = req.files.logo[0].path;
      update.logoPublicId = req.files.logo[0].filename;
    }

    /* ⭐ REPLACE BANNER */
    if (req.files?.banner?.[0]) {
      if (politician.bannerPublicId) {
        await cloudinary.uploader
          .destroy(politician.bannerPublicId, {
            resource_type: "image",
          })
          .catch(() => {});
      }

      update.banner = req.files.banner[0].path;
      update.bannerPublicId = req.files.banner[0].filename;
    }

    const updated = await Politician.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json({
      success: true,
      politician: updated,
    });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

/* =============================================================
   📌 DELETE — Delete Politician (IMAGE / VIDEO SAFE)
============================================================= */
exports.deletePolitician = async (req, res) => {
  try {
    const politician = await Politician.findById(req.params.id);
    if (!politician) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    /* ⭐ DELETE LOGO */
    if (politician.logoPublicId) {
      await cloudinary.uploader
        .destroy(politician.logoPublicId, {
          resource_type:
            politician.logoType === "video" ? "video" : "image",
        })
        .catch(() => {});
    }

    /* ⭐ DELETE BANNER */
    if (politician.bannerPublicId) {
      await cloudinary.uploader
        .destroy(politician.bannerPublicId, {
          resource_type: "image",
        })
        .catch(() => {});
    }

    await Politician.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Politician deleted",
    });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};