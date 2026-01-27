// // const Festival = require("../models/Festival");
// // const cloudinary = require("../config/cloudinary");

// // // GET — List (Search + Pagination)
// // exports.getFestivals = async (req, res) => {
// //   try {
// //     const { search = "", page = 1, limit = 5 } = req.query;

// //     const query = search
// //       ? { title: { $regex: search, $options: "i" } }
// //       : {};

// //     const total = await Festival.countDocuments(query);

// //     const festivals = await Festival.find(query)
// //       .skip((page - 1) * limit)
// //       .limit(limit)
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       festivals,
// //       pages: Math.ceil(total / limit),
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Something went wrong" });
// //   }
// // };

// // // POST — Create Festival
// // exports.createFestival = async (req, res) => {
// //   try {
// //     const { title, template, transition, status } = req.body;

// //     let logoUrl = "";
// //     let logoPublicId = "";

// //     if (req.file) {
// //       logoUrl = req.file.path;        // Cloudinary URL
// //       logoPublicId = req.file.filename; // Cloudinary Public ID
// //     }

// //     const fest = new Festival({
// //       title,
// //       template,
// //       transition,
// //       status,
// //       logo: logoUrl,
// //       logoPublicId,
// //     });

// //     await fest.save();

// //     res.json({ message: "Festival Created", festival: fest });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Create failed" });
// //   }
// // };

// // // PUT — Update Festival
// // exports.updateFestival = async (req, res) => {
// //   try {
// //     const { title, template, transition, status } = req.body;

// //     const festival = await Festival.findById(req.params.id);
// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     const update = {
// //       title,
// //       template,
// //       transition,
// //       status,
// //     };

// //     // New Logo?
// //     if (req.file) {
// //       // old delete
// //       if (festival.logoPublicId) {
// //         try {
// //           await cloudinary.uploader.destroy(festival.logoPublicId);
// //         } catch (err) {
// //           console.log("Cloudinary delete error:", err.message);
// //         }
// //       }

// //       update.logo = req.file.path;
// //       update.logoPublicId = req.file.filename;
// //     }

// //     const updated = await Festival.findByIdAndUpdate(req.params.id, update, {
// //       new: true,
// //     });

// //     res.json({ message: "Festival Updated", festival: updated });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Update failed" });
// //   }
// // };

// // // DELETE — Remove Festival + Cloudinary Image
// // exports.deleteFestival = async (req, res) => {
// //   try {
// //     const festival = await Festival.findById(req.params.id);

// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     // Delete Image from Cloudinary
// //     if (festival.logoPublicId) {
// //       try {
// //         await cloudinary.uploader.destroy(festival.logoPublicId);
// //       } catch (err) {
// //         console.log("Cloudinary delete warn:", err.message);
// //       }
// //     }

// //     await Festival.findByIdAndDelete(req.params.id);

// //     res.json({ message: "Festival Deleted" });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Delete failed" });
// //   }
// // };



// // const Festival = require("../models/Festival");
// // const { v2: cloudinary } = require('cloudinary');

// // // 📌 GET — List Festivals
// // exports.getFestivals = async (req, res) => {
// //   try {
// //     const { search = "", page = 1, limit = 5 } = req.query;

// //     const query = search
// //       ? { title: { $regex: search, $options: "i" } }
// //       : {};

// //     const total = await Festival.countDocuments(query);

// //     const festivals = await Festival.find(query)
// //       .skip((page - 1) * Number(limit))
// //       .limit(Number(limit))
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       festivals,
// //       pages: Math.ceil(total / limit),
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Something went wrong" });
// //   }
// // };

// // // 📌 POST — Create Festival
// // exports.createFestival = async (req, res) => {
// //   try {
// //     const { title, template, transition, status, zoom, offsetX, offsetY } = req.body;

// //     let logoUrl = "";
// //     let logoPublicId = "";

// //     // ⭐ Multer + Cloudinary upload
// //     if (req.file) {
// //       logoUrl = req.file.path;          // Cloudinary URL
// //       logoPublicId = req.file.filename; // Cloudinary public_id
// //     }

// //     const fest = new Festival({
// //       title,
// //       template,
// //       transition,
// //       status,
// //       logo: logoUrl,
// //       logoPublicId,
// //       zoom: zoom ? Number(zoom) : 1,
// //       offsetX: offsetX ? Number(offsetX) : 0,
// //       offsetY: offsetY ? Number(offsetY) : 0,
// //     });

// //     await fest.save();

// //     res.json({ message: "Festival Created", festival: fest });

// //   } catch (err) {
// //     console.error("❌ Create error:", err);
// //     res.status(500).json({ error: "Create failed" });
// //   }
// // };

// // // 📌 PUT — Update Festival
// // exports.updateFestival = async (req, res) => {
// //   try {
// //     const { title, template, transition, status, zoom, offsetX, offsetY } = req.body;

// //     const festival = await Festival.findById(req.params.id);
// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     const update = {
// //       title,
// //       template,
// //       transition,
// //       status,
// //       zoom: zoom ? Number(zoom) : festival.zoom,
// //       offsetX: offsetX ? Number(offsetX) : festival.offsetX,
// //       offsetY: offsetY ? Number(offsetY) : festival.offsetY,
// //     };

// //     // ⭐ New Logo uploaded?
// //     if (req.file) {
// //       if (festival.logoPublicId) {
// //         try {
// //           await cloudinary.uploader.destroy(festival.logoPublicId);
// //         } catch (err) {
// //           console.log("Cloudinary delete error:", err.message);
// //         }
// //       }

// //       update.logo = req.file.path;
// //       update.logoPublicId = req.file.filename;
// //     }

// //     const updated = await Festival.findByIdAndUpdate(req.params.id, update, { new: true });

// //     res.json({ message: "Festival Updated", festival: updated });

// //   } catch (err) {
// //     console.error("❌ Update error:", err);
// //     res.status(500).json({ error: "Update failed" });
// //   }
// // };

// // // 📌 DELETE — Remove Festival + Cloudinary
// // exports.deleteFestival = async (req, res) => {
// //   try {
// //     const festival = await Festival.findById(req.params.id);
// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     // ⭐ Delete Cloudinary image
// //     if (festival.logoPublicId) {
// //       try {
// //         await cloudinary.uploader.destroy(festival.logoPublicId);
// //       } catch (err) {
// //         console.log("Cloudinary delete warn:", err.message);
// //       }
// //     }

// //     await Festival.findByIdAndDelete(req.params.id);

// //     res.json({ message: "Festival Deleted" });

// //   } catch (err) {
// //     console.error("❌ Delete error:", err);
// //     res.status(500).json({ error: "Delete failed" });
// //   }
// // };


// // const Festival = require("../models/Festival");
// // const { v2: cloudinary } = require("cloudinary");

// // // =============================================================
// // // 📌 GET — List Festivals
// // // =============================================================
// // exports.getFestivals = async (req, res) => {
// //   try {
// //     const { search = "", page = 1, limit = 5 } = req.query;

// //     const query = search ? { title: { $regex: search, $options: "i" } } : {};

// //     const total = await Festival.countDocuments(query);

// //     const festivals = await Festival.find(query)
// //       .skip((page - 1) * Number(limit))
// //       .limit(Number(limit))
// //       .sort({ createdAt: -1 });

// //     res.json({ festivals, pages: Math.ceil(total / limit) });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Something went wrong" });
// //   }
// // };

// // // =============================================================
// // // 📌 POST — Create Festival
// // // =============================================================
// // exports.createFestival = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       template,
// //       transition,
// //       status,
// //       zoom,
// //       offsetX,
// //       offsetY,
// //       bannerZoom,
// //       bannerX,
// //       bannerY,
// //     } = req.body;

// //     let logoUrl = "";
// //     let logoPublicId = "";

// //     let bannerUrl = "";
// //     let bannerPublicId = "";

// //     // ⭐ Multer fields → req.files (logo + banner)
// //     if (req.files?.logo?.[0]) {
// //       logoUrl = req.files.logo[0].path;
// //       logoPublicId = req.files.logo[0].filename;
// //     }

// //     if (req.files?.banner?.[0]) {
// //       bannerUrl = req.files.banner[0].path;
// //       bannerPublicId = req.files.banner[0].filename;
// //     }

// //     const fest = new Festival({
// //       title,
// //       template,
// //       transition,
// //       status,

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

// //     await fest.save();

// //     res.json({ message: "Festival Created", festival: fest });
// //   } catch (err) {
// //     console.error("❌ Create error:", err);
// //     res.status(500).json({ error: "Create failed" });
// //   }
// // };

// // // =============================================================
// // // 📌 PUT — Update Festival
// // // =============================================================
// // exports.updateFestival = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       template,
// //       transition,
// //       status,
// //       zoom,
// //       offsetX,
// //       offsetY,
// //       bannerZoom,
// //       bannerX,
// //       bannerY,
// //     } = req.body;

// //     const festival = await Festival.findById(req.params.id);
// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     const update = {
// //       title,
// //       template,
// //       transition,
// //       status,

// //       // LOGO transform
// //       zoom: Number(zoom),
// //       offsetX: Number(offsetX),
// //       offsetY: Number(offsetY),

// //       // BANNER transform
// //       bannerZoom: Number(bannerZoom),
// //       bannerX: Number(bannerX),
// //       bannerY: Number(bannerY),
// //     };

// //     // ⭐ NEW LOGO uploaded?
// //     if (req.files?.logo?.[0]) {
// //       if (festival.logoPublicId) {
// //         await cloudinary.uploader.destroy(festival.logoPublicId).catch(() => {});
// //       }

// //       update.logo = req.files.logo[0].path;
// //       update.logoPublicId = req.files.logo[0].filename;
// //     }

// //     // ⭐ NEW BANNER uploaded?
// //     if (req.files?.banner?.[0]) {
// //       if (festival.bannerPublicId) {
// //         await cloudinary.uploader.destroy(festival.bannerPublicId).catch(() => {});
// //       }

// //       update.banner = req.files.banner[0].path;
// //       update.bannerPublicId = req.files.banner[0].filename;
// //     }

// //     const updated = await Festival.findByIdAndUpdate(req.params.id, update, {
// //       new: true,
// //     });

// //     res.json({ message: "Festival Updated", festival: updated });
// //   } catch (err) {
// //     console.error("❌ Update error:", err);
// //     res.status(500).json({ error: "Update failed" });
// //   }
// // };

// // // =============================================================
// // // 📌 DELETE — Remove Festival + Cloudinary (logo + banner both)
// // // =============================================================
// // exports.deleteFestival = async (req, res) => {
// //   try {
// //     const festival = await Festival.findById(req.params.id);
// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     // Delete logo
// //     if (festival.logoPublicId) {
// //       await cloudinary.uploader.destroy(festival.logoPublicId).catch(() => {});
// //     }

// //     // Delete banner
// //     if (festival.bannerPublicId) {
// //       await cloudinary.uploader.destroy(festival.bannerPublicId).catch(() => {});
// //     }

// //     await Festival.findByIdAndDelete(req.params.id);

// //     res.json({ message: "Festival Deleted" });
// //   } catch (err) {
// //     console.error("❌ Delete error:", err);
// //     res.status(500).json({ error: "Delete failed" });
// //   }
// // };


// // const Festival = require("../models/Festival");
// // const { v2: cloudinary } = require("cloudinary");

// // // =============================================================
// // // 📌 GET — List Festivals
// // // =============================================================
// // exports.getFestivals = async (req, res) => {
// //   try {
// //     const { search = "", page = 1, limit = 5 } = req.query;

// //     const query = search
// //       ? { title: { $regex: search, $options: "i" } }
// //       : {};

// //     const total = await Festival.countDocuments(query);

// //     const festivals = await Festival.find(query)
// //       .skip((page - 1) * Number(limit))
// //       .limit(Number(limit))
// //       .sort({ createdAt: -1 });

// //     res.json({ festivals, pages: Math.ceil(total / limit) });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Something went wrong" });
// //   }
// // };

// // // =============================================================
// // // 📌 POST — Create Festival (IMAGE / VIDEO LOGO)
// // // =============================================================
// // exports.createFestival = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       template,
// //       transition,
// //       status,
// //       zoom,
// //       offsetX,
// //       offsetY,
// //       bannerZoom,
// //       bannerX,
// //       bannerY,
// //     } = req.body;

// //     let logoUrl = "";
// //     let logoPublicId = "";
// //     let logoType = "image";

// //     let bannerUrl = "";
// //     let bannerPublicId = "";

// //     // ⭐ LOGO (Image / Video)
// //     if (req.files?.logo?.[0]) {
// //       const logoFile = req.files.logo[0];

// //       logoUrl = logoFile.path;
// //       logoPublicId = logoFile.filename;
// //       logoType = logoFile.mimetype.startsWith("video")
// //         ? "video"
// //         : "image";
// //     }

// //     // ⭐ BANNER (Image only)
// //     if (req.files?.banner?.[0]) {
// //       bannerUrl = req.files.banner[0].path;
// //       bannerPublicId = req.files.banner[0].filename;
// //     }

// //     const fest = new Festival({
// //       title,
// //       template,
// //       transition,
// //       status,

// //       // LOGO
// //       logo: logoUrl,
// //       logoPublicId,
// //       logoType,
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

// //     await fest.save();

// //     res.json({ message: "Festival Created", festival: fest });
// //   } catch (err) {
// //     console.error("❌ Create error:", err);
// //     res.status(500).json({ error: "Create failed" });
// //   }
// // };

// // // =============================================================
// // // 📌 PUT — Update Festival (IMAGE / VIDEO LOGO)
// // // =============================================================
// // exports.updateFestival = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       template,
// //       transition,
// //       status,
// //       zoom,
// //       offsetX,
// //       offsetY,
// //       bannerZoom,
// //       bannerX,
// //       bannerY,
// //     } = req.body;

// //     const festival = await Festival.findById(req.params.id);
// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     const update = {
// //       title,
// //       template,
// //       transition,
// //       status,

// //       zoom: Number(zoom),
// //       offsetX: Number(offsetX),
// //       offsetY: Number(offsetY),

// //       bannerZoom: Number(bannerZoom),
// //       bannerX: Number(bannerX),
// //       bannerY: Number(bannerY),
// //     };

// //     // ⭐ NEW LOGO (Image / Video)
// //     if (req.files?.logo?.[0]) {
// //       const logoFile = req.files.logo[0];
// //       const isVideo = logoFile.mimetype.startsWith("video");

// //       // delete old logo
// //       if (festival.logoPublicId) {
// //         await cloudinary.uploader.destroy(
// //           festival.logoPublicId,
// //           { resource_type: festival.logoType === "video" ? "video" : "image" }
// //         ).catch(() => {});
// //       }

// //       update.logo = logoFile.path;
// //       update.logoPublicId = logoFile.filename;
// //       update.logoType = isVideo ? "video" : "image";
// //     }

// //     // ⭐ NEW BANNER
// //     if (req.files?.banner?.[0]) {
// //       if (festival.bannerPublicId) {
// //         await cloudinary.uploader.destroy(
// //           festival.bannerPublicId,
// //           { resource_type: "image" }
// //         ).catch(() => {});
// //       }

// //       update.banner = req.files.banner[0].path;
// //       update.bannerPublicId = req.files.banner[0].filename;
// //     }

// //     const updated = await Festival.findByIdAndUpdate(
// //       req.params.id,
// //       update,
// //       { new: true }
// //     );

// //     res.json({ message: "Festival Updated", festival: updated });
// //   } catch (err) {
// //     console.error("❌ Update error:", err);
// //     res.status(500).json({ error: "Update failed" });
// //   }
// // };

// // // =============================================================
// // // 📌 DELETE — Remove Festival (Logo + Banner)
// // // =============================================================
// // exports.deleteFestival = async (req, res) => {
// //   try {
// //     const festival = await Festival.findById(req.params.id);
// //     if (!festival) return res.status(404).json({ error: "Not found" });

// //     // delete logo
// //     if (festival.logoPublicId) {
// //       await cloudinary.uploader.destroy(
// //         festival.logoPublicId,
// //         { resource_type: festival.logoType === "video" ? "video" : "image" }
// //       ).catch(() => {});
// //     }

// //     // delete banner
// //     if (festival.bannerPublicId) {
// //       await cloudinary.uploader.destroy(
// //         festival.bannerPublicId,
// //         { resource_type: "image" }
// //       ).catch(() => {});
// //     }

// //     await Festival.findByIdAndDelete(req.params.id);

// //     res.json({ message: "Festival Deleted" });
// //   } catch (err) {
// //     console.error("❌ Delete error:", err);
// //     res.status(500).json({ error: "Delete failed" });
// //   }
// // };


// const Festival = require("../models/Festival");
// const { v2: cloudinary } = require("cloudinary");

// // =============================================================
// // 🔥 HELPER — Auto Expire Festivals
// // =============================================================
// const autoExpireFestivals = async () => {
//   try {
//     await Festival.updateMany(
//       {
//         expireAt: { $lt: new Date() },
//         status: "active",
//       },
//       { status: "inactive" }
//     );
//   } catch (err) {
//     console.error("Auto expire failed:", err.message);
//   }
// };

// // =============================================================
// // 📌 GET — List Festivals (ACTIVE first, expired below)
// // =============================================================
// exports.getFestivals = async (req, res) => {
//   try {
//     const { search = "", page = 1, limit = 5 } = req.query;

//     // 🔥 auto expire before listing
//     await autoExpireFestivals();

//     const query = search
//       ? { title: { $regex: search, $options: "i" } }
//       : {};

//     const total = await Festival.countDocuments(query);

//     const festivals = await Festival.find(query)
//       .sort({
//         status: 1,        // active first
//         expireAt: 1,      // nearest expiry first
//         createdAt: -1,
//       })
//       .skip((page - 1) * Number(limit))
//       .limit(Number(limit));

//     res.json({
//       festivals,
//       pages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// // =============================================================
// // 📌 POST — Create Festival (with TIMELINE)
// // =============================================================
// exports.createFestival = async (req, res) => {
//   try {
//     const {
//       title,
//       template,
//       transition,
//       status,
//       startAt,
//       expireAt,
//       zoom,
//       offsetX,
//       offsetY,
//       bannerZoom,
//       bannerX,
//       bannerY,
//     } = req.body;

//     if (!expireAt) {
//       return res.status(400).json({ error: "expireAt is required" });
//     }

//     let logoUrl = "";
//     let logoPublicId = "";
//     let logoType = "image";

//     let bannerUrl = "";
//     let bannerPublicId = "";

//     // ⭐ LOGO (Image / Video)
//     if (req.files?.logo?.[0]) {
//       const logoFile = req.files.logo[0];
//       logoUrl = logoFile.path;
//       logoPublicId = logoFile.filename;
//       logoType = logoFile.mimetype.startsWith("video") ? "video" : "image";
//     }

//     // ⭐ BANNER (Image)
//     if (req.files?.banner?.[0]) {
//       bannerUrl = req.files.banner[0].path;
//       bannerPublicId = req.files.banner[0].filename;
//     }

//     const fest = new Festival({
//       title,
//       template,
//       transition,
//       status,

//       // 🔥 TIMELINE
//       startAt: startAt ? new Date(startAt) : new Date(),
//       expireAt: new Date(expireAt),

//       // LOGO
//       logo: logoUrl,
//       logoPublicId,
//       logoType,
//       zoom: Number(zoom),
//       offsetX: Number(offsetX),
//       offsetY: Number(offsetY),

//       // BANNER
//       banner: bannerUrl,
//       bannerPublicId,
//       bannerZoom: Number(bannerZoom),
//       bannerX: Number(bannerX),
//       bannerY: Number(bannerY),
//     });

//     await fest.save();

//     res.json({
//       message: "Festival Created",
//       festival: fest,
//     });
//   } catch (err) {
//     console.error("❌ Create error:", err);
//     res.status(500).json({ error: "Create failed" });
//   }
// };

// // =============================================================
// // 📌 PUT — Update Festival
// // =============================================================
// exports.updateFestival = async (req, res) => {
//   try {
//     const {
//       title,
//       template,
//       transition,
//       status,
//       startAt,
//       expireAt,
//       zoom,
//       offsetX,
//       offsetY,
//       bannerZoom,
//       bannerX,
//       bannerY,
//     } = req.body;

//     const festival = await Festival.findById(req.params.id);
//     if (!festival) return res.status(404).json({ error: "Not found" });

//     const update = {
//       title,
//       template,
//       transition,
//       status,

//       startAt: startAt ? new Date(startAt) : festival.startAt,
//       expireAt: expireAt ? new Date(expireAt) : festival.expireAt,

//       zoom: Number(zoom),
//       offsetX: Number(offsetX),
//       offsetY: Number(offsetY),

//       bannerZoom: Number(bannerZoom),
//       bannerX: Number(bannerX),
//       bannerY: Number(bannerY),
//     };

//     // ⭐ NEW LOGO
//     if (req.files?.logo?.[0]) {
//       const logoFile = req.files.logo[0];
//       const isVideo = logoFile.mimetype.startsWith("video");

//       if (festival.logoPublicId) {
//         await cloudinary.uploader.destroy(
//           festival.logoPublicId,
//           { resource_type: festival.logoType === "video" ? "video" : "image" }
//         ).catch(() => {});
//       }

//       update.logo = logoFile.path;
//       update.logoPublicId = logoFile.filename;
//       update.logoType = isVideo ? "video" : "image";
//     }

//     // ⭐ NEW BANNER
//     if (req.files?.banner?.[0]) {
//       if (festival.bannerPublicId) {
//         await cloudinary.uploader.destroy(
//           festival.bannerPublicId,
//           { resource_type: "image" }
//         ).catch(() => {});
//       }

//       update.banner = req.files.banner[0].path;
//       update.bannerPublicId = req.files.banner[0].filename;
//     }

//     const updated = await Festival.findByIdAndUpdate(
//       req.params.id,
//       update,
//       { new: true }
//     );

//     res.json({
//       message: "Festival Updated",
//       festival: updated,
//     });
//   } catch (err) {
//     console.error("❌ Update error:", err);
//     res.status(500).json({ error: "Update failed" });
//   }
// };

// // =============================================================
// // 📌 DELETE — Remove Festival
// // =============================================================
// exports.deleteFestival = async (req, res) => {
//   try {
//     const festival = await Festival.findById(req.params.id);
//     if (!festival) return res.status(404).json({ error: "Not found" });

//     if (festival.logoPublicId) {
//       await cloudinary.uploader.destroy(
//         festival.logoPublicId,
//         { resource_type: festival.logoType === "video" ? "video" : "image" }
//       ).catch(() => {});
//     }

//     if (festival.bannerPublicId) {
//       await cloudinary.uploader.destroy(
//         festival.bannerPublicId,
//         { resource_type: "image" }
//       ).catch(() => {});
//     }

//     await Festival.findByIdAndDelete(req.params.id);

//     res.json({ message: "Festival Deleted" });
//   } catch (err) {
//     console.error("❌ Delete error:", err);
//     res.status(500).json({ error: "Delete failed" });
//   }
// };
const Festival = require("../models/Festival");
const { v2: cloudinary } = require("cloudinary");

/* =============================================================
 🔥 HELPER — Auto Expire Festivals
============================================================= */
const autoExpireFestivals = async () => {
  try {
    await Festival.updateMany(
      { expireAt: { $lt: new Date() }, status: "active" },
      { status: "inactive" }
    );
  } catch (err) {
    console.error("Auto expire failed:", err.message);
  }
};

/* =============================================================
 📌 GET — List Festivals (ACTIVE first)
============================================================= */
exports.getFestivals = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    await autoExpireFestivals();

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const total = await Festival.countDocuments(query);

    const festivals = await Festival.find(query)
      .sort({ status: 1, expireAt: 1, createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      festivals,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("❌ GET error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

/* =============================================================
 📌 POST — Create Festival (PROPER STRUCTURE)
============================================================= */
exports.createFestival = async (req, res) => {
  try {
    const {
      title,
      template,
      status,
      startAt,
      expireAt,

      /* OLD TRANSFORM */
      zoom,
      offsetX,
      offsetY,

      bannerZoom,
      bannerX,
      bannerY,

      /* PROFILE */
      profileSize,
      profileShape,
      profilePosition,

      /* PROFILE ANIMATION */
      profileAnimationEffect,
      profileAnimationDuration,
      profileAnimationDelay,
      profileAnimationEasing,

      /* TRANSITION */
      transitionType,
      transitionDuration,
      transitionDelay,
      transitionEasing,
    } = req.body;

    if (!expireAt) {
      return res.status(400).json({ error: "expireAt is required" });
    }

    /* ================= FILES ================= */
    let logo = "",
      logoPublicId = "",
      logoType = "image";
    let banner = "",
      bannerPublicId = "";

    if (req.files?.logo?.[0]) {
      const f = req.files.logo[0];
      logo = f.path;
      logoPublicId = f.filename;
      logoType = f.mimetype.startsWith("video") ? "video" : "image";
    }

    if (req.files?.banner?.[0]) {
      banner = req.files.banner[0].path;
      bannerPublicId = req.files.banner[0].filename;
    }

    const festival = await Festival.create({
      title,
      template,
      status: status || "active",

      /* TIMELINE */
      startAt: startAt ? new Date(startAt) : new Date(),
      expireAt: new Date(expireAt),

      /* LOGO (BACKWARD SAFE) */
      logo,
      logoPublicId,
      logoType,
      zoom: Number(zoom) || 1,
      offsetX: Number(offsetX) || 0,
      offsetY: Number(offsetY) || 0,

      /* PROFILE */
      profile: {
        size: Number(profileSize) || 120,
        shape: profileShape || "circle",
        position: profilePosition || "center",
      },

      /* PROFILE ANIMATION */
      animation: {
        profile: {
          effect: profileAnimationEffect || "fadeIn",
          duration: Number(profileAnimationDuration) || 0.8, // seconds
          delay: Number(profileAnimationDelay) || 0,
          easing: profileAnimationEasing || "ease",
        },
      },

      /* TRANSITION */
      transition: {
        type: transitionType || "fade",
        duration: Number(transitionDuration) || 0.8,
        delay: Number(transitionDelay) || 0,
        easing: transitionEasing || "ease",
      },

      /* BANNER */
      banner,
      bannerPublicId,
      bannerZoom: Number(bannerZoom) || 1,
      bannerX: Number(bannerX) || 0,
      bannerY: Number(bannerY) || 0,
    });

    res.json({
      message: "Festival Created",
      festival,
    });
  } catch (err) {
    console.error("❌ Create error:", err);
    res.status(500).json({ error: "Create failed" });
  }
};

/* =============================================================
 📌 PUT — Update Festival
============================================================= */
exports.updateFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) {
      return res.status(404).json({ error: "Not found" });
    }

    const {
      title,
      template,
      status,
      startAt,
      expireAt,

      zoom,
      offsetX,
      offsetY,

      bannerZoom,
      bannerX,
      bannerY,

      profileSize,
      profileShape,
      profilePosition,

      profileAnimationEffect,
      profileAnimationDuration,
      profileAnimationDelay,
      profileAnimationEasing,

      transitionType,
      transitionDuration,
      transitionDelay,
      transitionEasing,
    } = req.body;

    const update = {
      title,
      template,
      status,

      startAt: startAt ? new Date(startAt) : festival.startAt,
      expireAt: expireAt ? new Date(expireAt) : festival.expireAt,

      zoom: Number(zoom) || festival.zoom,
      offsetX: Number(offsetX) || festival.offsetX,
      offsetY: Number(offsetY) || festival.offsetY,

      bannerZoom: Number(bannerZoom) || festival.bannerZoom,
      bannerX: Number(bannerX) || festival.bannerX,
      bannerY: Number(bannerY) || festival.bannerY,

      profile: {
        size: Number(profileSize) || festival.profile.size,
        shape: profileShape || festival.profile.shape,
        position: profilePosition || festival.profile.position,
      },

      animation: {
        profile: {
          effect:
            profileAnimationEffect ||
            festival.animation.profile.effect,
          duration:
            Number(profileAnimationDuration) ||
            festival.animation.profile.duration,
          delay:
            Number(profileAnimationDelay) ||
            festival.animation.profile.delay,
          easing:
            profileAnimationEasing ||
            festival.animation.profile.easing,
        },
      },

      transition: {
        type: transitionType || festival.transition.type,
        duration:
          Number(transitionDuration) ||
          festival.transition.duration,
        delay:
          Number(transitionDelay) ||
          festival.transition.delay,
        easing:
          transitionEasing || festival.transition.easing,
      },
    };

    /* LOGO UPDATE */
    if (req.files?.logo?.[0]) {
      const f = req.files.logo[0];
      const isVideo = f.mimetype.startsWith("video");

      if (festival.logoPublicId) {
        await cloudinary.uploader
          .destroy(festival.logoPublicId, {
            resource_type: festival.logoType === "video" ? "video" : "image",
          })
          .catch(() => {});
      }

      update.logo = f.path;
      update.logoPublicId = f.filename;
      update.logoType = isVideo ? "video" : "image";
    }

    /* BANNER UPDATE */
    if (req.files?.banner?.[0]) {
      if (festival.bannerPublicId) {
        await cloudinary.uploader
          .destroy(festival.bannerPublicId, {
            resource_type: "image",
          })
          .catch(() => {});
      }

      update.banner = req.files.banner[0].path;
      update.bannerPublicId = req.files.banner[0].filename;
    }

    const updated = await Festival.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json({
      message: "Festival Updated",
      festival: updated,
    });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: "Update failed" });
  }
};

/* =============================================================
 📌 DELETE — Remove Festival
============================================================= */
exports.deleteFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) {
      return res.status(404).json({ error: "Not found" });
    }

    if (festival.logoPublicId) {
      await cloudinary.uploader
        .destroy(festival.logoPublicId, {
          resource_type: festival.logoType === "video" ? "video" : "image",
        })
        .catch(() => {});
    }

    if (festival.bannerPublicId) {
      await cloudinary.uploader
        .destroy(festival.bannerPublicId, {
          resource_type: "image",
        })
        .catch(() => {});
    }

    await Festival.findByIdAndDelete(req.params.id);

    res.json({ message: "Festival Deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};
