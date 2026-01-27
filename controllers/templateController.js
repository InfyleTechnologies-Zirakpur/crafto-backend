
// // const Template = require("../models/templateModel");
// // const Category = require("../models/categoryModel");
// // const Politician = require("../models/politicianModel");
// // const Religious = require("../models/religiousModel");
// // const Anniversary=require("../models/Anniversary");
// // const Birthday=require("../models/birthdayModel");
// // const Festival=require("../models/Festival");

// // const { exportToCsv, importFromCsv } = require("../utils/csv");
// // const fs = require("fs");


// // // ---------------------- FILE INFO HELPER ----------------------
// // const getFileInfo = (filesObj, fieldName) => {
// //   if (!filesObj) return null;
// //   const arr = filesObj[fieldName];
// //   if (!arr || !arr.length) return null;
// //   const f = arr[0];
// //   return { url: f.path, public_id: f.filename };
// // };

// // // ---------------------- CLEAN PARENT FIELDS ----------------------
// // // const sanitizeParents = (obj) => {
// // //   const result = { ...obj };

// // //   ["category", "politician", "religious"].forEach(k => {
// // //     if (result[k] === "") result[k] = null;
// // //   });

// // //   if (result.category) {
// // //     result.politician = null;
// // //     result.religious = null;
// // //   } else if (result.politician) {
// // //     result.category = null;
// // //     result.religious = null;
// // //   } else if (result.religious) {
// // //     result.category = null;
// // //     result.politician = null;
// // //   }

// // //   return result;
// // // };

// // const sanitizeParents = (obj) => {
// //   const result = { ...obj };

// //   const parentKeys = [
// //     "category",
// //     "politician",
// //     "religious",
// //     "birthday",
// //     "anniversary",
// //     "festival"
// //   ];

// //   parentKeys.forEach(k => {
// //     if (result[k] === "" || result[k] === null || result[k] === "null") {
// //       result[k] = null;
// //     }
// //   });

// //   // detect selected parent
// //   const selected = parentKeys.find(key => result[key]);

// //   // remove all other parents
// //   parentKeys.forEach(key => {
// //     if (key !== selected) result[key] = null;
// //   });

// //   return result;
// // };


// // // ---------------------- GET TEMPLATES (Pagination + Search) ----------------------
// // exports.getTemplates = async (req, res) => {
// //   try {
// //     let { page = 1, limit = 6, search = "" } = req.query;

// //     page = Number(page);
// //     limit = Number(limit);

// //     const filter = {};

// //     if (search.trim()) {
// //       const regex = new RegExp(search.trim(), "i");
// //       filter.$or = [
// //         { title: regex },
// //         { profilePosition: regex },
// //         { transitionType: regex },
// //       ];
// //     }

// //     const total = await Template.countDocuments(filter);

// //     const templates = await Template.find(filter)
// //       .populate("category")
// // .populate("politician")
// // .populate("religious")
// // .populate("birthday")
// // .populate("anniversary")
// // .populate("festival")

// //       .sort({ createdAt: -1 })
// //       .skip((page - 1) * limit)
// //       .limit(limit);

// //     res.json({
// //       success: true,
// //       templates,
// //       total,
// //       page,
// //       pages: Math.ceil(total / limit),
// //     });

// //   } catch (err) {
// //     console.error("getTemplates error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ---------------------- CREATE TEMPLATE ----------------------
// // exports.createTemplate = async (req, res) => {
// //   try {
// //     const body = req.body || {};
// //     const sanitized = sanitizeParents(body);

// //     const file = getFileInfo(req.files, "file");
// //     const frame = getFileInfo(req.files, "frameFile");

// //     const doc = {
// //       ...sanitized,
// //       file: file?.url || sanitized.file || null,
// //       filePublicId: file?.public_id || null,
// //       frameFile: frame?.url || sanitized.frameFile || null,
// //       frameFilePublicId: frame?.public_id || null,
// //     };

// //     const saved = await Template.create(doc);

// //     const populated = await Template.findById(saved._id)
// //       .populate("category")
// //       .populate("politician")
// //       .populate("religious");

// //     res.json({ success: true, template: populated });

// //   } catch (err) {
// //     console.error("Create error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ---------------------- UPDATE TEMPLATE ----------------------
// // exports.updateTemplate = async (req, res) => {
// //   try {
// //     let data = sanitizeParents({ ...req.body });
// //     const id = req.params.id;

// //     const file = getFileInfo(req.files, "file");
// //     const frame = getFileInfo(req.files, "frameFile");

// //     if (file) {
// //       data.file = file.url;
// //       data.filePublicId = file.public_id;
// //     }

// //     if (frame) {
// //       data.frameFile = frame.url;
// //       data.frameFilePublicId = frame.public_id;
// //     }

// //     const updated = await Template.findByIdAndUpdate(id, data, { new: true })
// //       .populate("category")
// //       .populate("politician")
// //       .populate("religious");

// //     res.json({ success: true, template: updated });

// //   } catch (err) {
// //     console.error("Update error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ---------------------- DELETE TEMPLATE ----------------------
// // exports.deleteTemplate = async (req, res) => {
// //   try {
// //     await Template.findByIdAndDelete(req.params.id);
// //     res.json({ success: true });
// //   } catch (err) {
// //     console.error("Delete error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ---------------------- STATUS UPDATE ----------------------
// // // exports.updateStatus = async (req, res) => {
// // //   try {
// // //     const updated = await Template.findByIdAndUpdate(
// // //       req.params.id,
// // //       { status: req.body.status },
// // //       { new: true }
// // //     );

// // //     res.json({ success: true, updated });

// // //   } catch (err) {
// // //     console.error("Status update error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };


// // exports.updateStatus = async (req, res) => {
// //   try {
// //     const template = await Template.findById(req.params.id);
// //     if (!template)
// //       return res.status(404).json({ success: false, message: "Template not found" });

// //     // Toggle
// //     const newStatus = template.status === "active" ? "inactive" : "active";
// //     template.status = newStatus;
// //     await template.save();

// //     // Return fully populated updated template
// //     const updated = await Template.findById(req.params.id)
// //       .populate("category")
// //       .populate("politician")
// //       .populate("religious")
// //       .populate("birthday")
// //       .populate("anniversary")
// //       .populate("festival");

// //     res.json({
// //       success: true,
// //       message: "Status updated",
// //       template: updated
// //     });

// //   } catch (err) {
// //     console.error("Status update error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };


// // // ---------------------- BULK DELETE ----------------------
// // exports.bulkDeleteTemplates = async (req, res) => {
// //   try {
// //     await Template.deleteMany({ _id: { $in: req.body.ids } });

// //     res.json({ success: true });

// //   } catch (err) {
// //     console.error("Bulk delete error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ---------------------- IMPORT CSV (JSON ARRAY) ----------------------
// // exports.importTemplatesFromCsv = async (req, res) => {
// //   try {
// //     const rows = Array.isArray(req.body) ? req.body : [];
// //     let created = 0;

// //     for (const r of rows) {
// //       const title = (r.title || "").trim();
// //       if (!title) continue;

// //       let categoryId = null, politicianId = null, religiousId = null;

// //       const parentType = (r.parentType || "").trim();
// //       const parentName = (r.parent || "").trim();

// //       if (parentType === "Category") {
// //         const c = await Category.findOne({ title: parentName });
// //         if (c) categoryId = c._id;
// //       }

// //       if (parentType === "Politician") {
// //         const p = await Politician.findOne({ name: parentName });
// //         if (p) politicianId = p._id;
// //       }

// //       if (parentType === "Religious") {
// //         const rr = await Religious.findOne({ name: parentName });
// //         if (rr) religiousId = rr._id;
// //       }

// //       await Template.create({
// //         title,
// //         type: r.type,
// //         status: r.status,
// //         file: r.file,
// //         frameFile: r.frameFile,
// //         category: categoryId,
// //         politician: politicianId,
// //         religious: religiousId,
// //         transitionPlacement: r.transitionPlacement,
// //         profilePosition: r.profilePosition,
// //         transitionType: r.transitionType,
// //         orientation: r.orientation,
// //         profileSize: r.profileSize,
// //         profileShape: r.profileShape,
// //       });

// //       created++;
// //     }

// //     res.json({ success: true, created });

// //   } catch (err) {
// //     console.error("CSV import error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ---------------------- IMPORT CSV FILE ----------------------
// // exports.importTemplatesFromCsvFile = async (req, res) => {
// //   try {
// //     if (!req.file)
// //       return res.status(400).json({ success: false, message: "CSV file required" });

// //     const rows = await importFromCsv(req.file.path);
// //     let created = 0;

// //     for (const r of rows) {
// //       const title = (r.title || "").trim();
// //       if (!title) continue;

// //       let categoryId = null, politicianId = null, religiousId = null;

// //       const parentType = (r.parentType || "").trim();
// //       const parentName = (r.parent || "").trim();

// //       if (parentType === "Category") {
// //         const c = await Category.findOne({ title: parentName });
// //         if (c) categoryId = c._id;
// //       }

// //       if (parentType === "Politician") {
// //         const p = await Politician.findOne({ name: parentName });
// //         if (p) politicianId = p._id;
// //       }

// //       if (parentType === "Religious") {
// //         const rr = await Religious.findOne({ name: parentName });
// //         if (rr) religiousId = rr._id;
// //       }

// //       await Template.create({
// //         title,
// //         type: r.type,
// //         status: r.status,
// //         file: r.file,
// //         frameFile: r.frameFile,
// //         category: categoryId,
// //         politician: politicianId,
// //         religious: religiousId,
// //         transitionPlacement: r.transitionPlacement,
// //         profilePosition: r.profilePosition,
// //         transitionType: r.transitionType,
// //         orientation: r.orientation,
// //         profileSize: r.profileSize,
// //         profileShape: r.profileShape,
// //       });

// //       created++;
// //     }

// //     fs.unlinkSync(req.file.path);

// //     return res.json({ success: true, created });

// //   } catch (err) {
// //     console.error("CSV File Import Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // ---------------------- EXPORT CSV ----------------------
// // // exports.exportTemplatesToCsv = async (req, res) => {
// // //   try {
// // //     const templates = await Template.find()
// // //       .populate("category")
// // //       .populate("politician")
// // //       .populate("religious");

// // //     const csvData = templates.map(t => ({
// // //       title: t.title,
// // //       type: t.type,
// // //       status: t.status,
// // //       parentType: t.category
// // //         ? "Category"
// // //         : t.politician
// // //         ? "Politician"
// // //         : t.religious
// // //         ? "Religious"
// // //         : "",
// // //       parent: t.category?.title || t.politician?.name || t.religious?.name || "",
// // //       file: t.file || "",
// // //       frameFile: t.frameFile || "",
// // //       transitionPlacement: t.transitionPlacement,
// // //       profilePosition: t.profilePosition,
// // //       transitionType: t.transitionType,
// // //       orientation: t.orientation,
// // //       profileSize: t.profileSize,
// // //       profileShape: t.profileShape,
// // //     }));

// // //     const fields = [
// // //       "title",
// // //       "type",
// // //       "status",
// // //       "parentType",
// // //       "parent",
// // //       "file",
// // //       "frameFile",
// // //       "transitionPlacement",
// // //       "profilePosition",
// // //       "transitionType",
// // //       "orientation",
// // //       "profileSize",
// // //       "profileShape",
// // //     ];

// // //     const csv = exportToCsv(csvData, fields);

// // //     res.header("Content-Type", "text/csv");
// // //     res.attachment("templates.csv");
// // //     return res.send(csv);

// // //   } catch (err) {
// // //     console.error("Export CSV Error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };


// // exports.exportTemplatesToCsv = async (req, res) => {
// //   try {
// //     const templates = await Template.find()
// //       .populate("category")
// //       .populate("politician")
// //       .populate("religious")
// //       .populate("birthday")
// //       .populate("anniversary")
// //       .populate("festival");

// //     const csvData = templates.map(t => ({
// //       title: t.title,
// //       type: t.type,
// //       status: t.status,

// //       // =============================
// //       //    Parent Type Selection
// //       // =============================
// //       parentType:
// //         t.category
// //           ? "Category"
// //           : t.politician
// //           ? "Politician"
// //           : t.religious
// //           ? "Religious"
// //           : t.birthday
// //           ? "Birthday"
// //           : t.anniversary
// //           ? "Anniversary"
// //           : t.festival
// //           ? "Festival"
// //           : "",

// //       // =============================
// //       //    Parent Title / Name
// //       // =============================
// //       parent:
// //         t.category?.title ||
// //         t.politician?.name ||
// //         t.religious?.name ||
// //         t.birthday?.title ||
// //         t.anniversary?.title ||
// //         t.festival?.title ||
// //         "",

// //       // File Info
// //       file: t.file || "",
// //       frameFile: t.frameFile || "",

// //       // Template Controls
// //       transitionPlacement: t.transitionPlacement,
// //       profilePosition: t.profilePosition,
// //       transitionType: t.transitionType,
// //       orientation: t.orientation,
// //       profileSize: t.profileSize,
// //       profileShape: t.profileShape,
// //     }));

// //     const fields = [
// //       "title",
// //       "type",
// //       "status",
// //       "parentType",
// //       "parent",
// //       "file",
// //       "frameFile",
// //       "transitionPlacement",
// //       "profilePosition",
// //       "transitionType",
// //       "orientation",
// //       "profileSize",
// //       "profileShape",
// //     ];

// //     const csv = exportToCsv(csvData, fields);

// //     res.header("Content-Type", "text/csv");
// //     res.attachment("templates.csv");
// //     return res.send(csv);

// //   } catch (err) {
// //     console.error("Export CSV Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// const Template = require("../models/templateModel");
// const Category = require("../models/categoryModel");
// const Politician = require("../models/politicianModel");
// const Religious = require("../models/religiousModel");
// const Anniversary = require("../models/Anniversary");
// const Birthday = require("../models/birthdayModel");
// const Festival = require("../models/Festival");

// const { exportToCsv, importFromCsv } = require("../utils/csv");
// const fs = require("fs");
// // ---------------------- ENUM CLEANER (VERY IMPORTANT) ----------------------
// const cleanEnum = (val, def) => {
//   if (
//     val === undefined ||
//     val === null ||
//     val === "" ||
//     val === "undefined"
//   ) {
//     return def;
//   }
//   return val;
// };


// // ---------------------- FILE INFO HELPER ----------------------
// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj) return null;
//   const arr = filesObj[fieldName];
//   if (!arr || !arr.length) return null;
//   const f = arr[0];
//   return { url: f.path, public_id: f.filename };
// };

// // ---------------------- MAP PARENT TYPE → PARENT ID ----------------------
// const mapParent = (type, id) => {
//   return {
//     category: type === "Category" ? id : null,
//     politician: type === "Politician" ? id : null,
//     religious: type === "Religious" ? id : null,
//     birthday: type === "Birthday" ? id : null,
//     anniversary: type === "Anniversary" ? id : null,
//     festival: type === "Festival" ? id : null,
//   };
// };

// // ---------------------- GET TEMPLATES (Pagination + Search) ----------------------
// exports.getTemplates = async (req, res) => {
//   try {
//     let { page = 1, limit = 6, search = "" } = req.query;

//     page = Number(page);
//     limit = Number(limit);

//     const filter = {};

//     if (search.trim()) {
//       const regex = new RegExp(search.trim(), "i");
//       filter.$or = [{ title: regex }];
//     }

//     const total = await Template.countDocuments(filter);

//     const templates = await Template.find(filter)
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     res.json({
//       success: true,
//       templates,
//       total,
//       page,
//       pages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.error("getTemplates error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // // ---------------------- CREATE TEMPLATE ----------------------
// // exports.createTemplate = async (req, res) => {
// //   try {
// //     const b = req.body;

// //     const parent = mapParent(b.parentType, b.parentId);

// //     const file = getFileInfo(req.files, "file");
// //     const frame = getFileInfo(req.files, "frameFile");

// //     // const doc = {
// //     //   title: b.title,
// //     //    contentOwnerName: (b.contentOwnerName || "").trim(),
// //     //   type: b.type,
// //     //   status: b.status,

// //     //   ...parent,

// //     //   file: file?.url || null,
// //     //   filePublicId: file?.public_id || null,
// //     //   frameFile: frame?.url || null,
// //     //   frameFilePublicId: frame?.public_id || null,

// //     //   transitionPlacement: b.transitionPlacement,
// //     //   profilePosition: b.profilePosition,
// //     //   transitionType: b.transitionType,
// //     //   orientation: b.orientation,
// //     //   profileSize: b.profileSize,
// //     //   profileShape: b.profileShape,
// //     // };
// //     const doc = {
// //   title: b.title,
// //   contentOwnerName: (b.contentOwnerName || "").trim(),
// //   type: b.type,
// //   status: b.status,

// //   ...parent,

// //   file: file?.url || null,
// //   filePublicId: file?.public_id || null,
// //   frameFile: frame?.url || null,
// //   frameFilePublicId: frame?.public_id || null,

// //   transitionPlacement: b.transitionPlacement || "below",
// //   profilePosition: b.profilePosition || "center",
// //   transitionType: b.transitionType || "fade",
// //   orientation: b.orientation || "landscape",
// //   profileSize: b.profileSize || "",
// //   profileShape: b.profileShape || "circle",
// // };


// //     const saved = await Template.create(doc);

// //     const populated = await Template.findById(saved._id)
// //       .populate("category")
// //       .populate("politician")
// //       .populate("religious")
// //       .populate("birthday")
// //       .populate("anniversary")
// //       .populate("festival");

// //     res.json({ success: true, template: populated });
// //   } catch (err) {
// //     console.error("Create error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };
// exports.createTemplate = async (req, res) => {
//   try {
//     const b = req.body;

//     const parent = mapParent(b.parentType, b.parentId);

//     const file = getFileInfo(req.files, "file");
//     const frame = getFileInfo(req.files, "frameFile");

//     const doc = {
//       // BASIC
//       title: (b.title || "").trim(),
//       contentOwnerName: (b.contentOwnerName || "").trim(),
//       type: b.type || "video",
//       status: b.status || "active",

//       // PARENT
//       ...parent,

//       // FILES
//       file: file?.url || null,
//       filePublicId: file?.public_id || null,
//       frameFile: frame?.url || null,
//       frameFilePublicId: frame?.public_id || null,

//       // ENUM + SAFE DEFAULTS
//     transitionPlacement: cleanEnum(b.transitionPlacement, "below"),
// transitionType: cleanEnum(b.transitionType, "fade"),
// profilePosition: cleanEnum(b.profilePosition, "center"),
// orientation: cleanEnum(b.orientation, "landscape"),
// profileShape: cleanEnum(b.profileShape, "circle"),
//       // OPTIONAL
//       profileSize: b.profileSize || "",
//     };

//     const saved = await Template.create(doc);

//     const populated = await Template.findById(saved._id)
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival");

//     res.json({ success: true, template: populated });
//   } catch (err) {
//     console.error("Create error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // ---------------------- UPDATE TEMPLATE ----------------------
// // exports.updateTemplate = async (req, res) => {
// //   try {
// //     const id = req.params.id;
// //     const b = req.body;

// //     const parent = mapParent(b.parentType, b.parentId);

// //     let data = {
// //       title: b.title,
// //        contentOwnerName: (b.contentOwnerName || "").trim(),
// //       type: b.type,
// //       status: b.status,

// //       ...parent,

// //       transitionPlacement: b.transitionPlacement,
// //       // profilePosition: b.profilePosition,
// //       profilePosition: b.profilePosition || "center",
// //       transitionType: b.transitionType,
// //       // orientation: b.orientation,
// //       orientation: b.orientation || "landscape",
// //       profileSize: b.profileSize,
// //       // profileShape: b.profileShape,
// //       profileShape: b.profileShape || "circle",
// //     };

// //     const file = getFileInfo(req.files, "file");
// //     const frame = getFileInfo(req.files, "frameFile");

// //     if (file) {
// //       data.file = file.url;
// //       data.filePublicId = file.public_id;
// //     }

// //     if (frame) {
// //       data.frameFile = frame.url;
// //       data.frameFilePublicId = frame.public_id;
// //     }

// //     const updated = await Template.findByIdAndUpdate(id, data, { new: true })
// //       .populate("category")
// //       .populate("politician")
// //       .populate("religious")
// //       .populate("birthday")
// //       .populate("anniversary")
// //       .populate("festival");

// //     res.json({ success: true, template: updated });
// //   } catch (err) {
// //     console.error("Update error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };
// exports.updateTemplate = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const b = req.body;

//     const parent = mapParent(b.parentType, b.parentId);

//     let data = {
//       title: (b.title || "").trim(),
//       contentOwnerName: (b.contentOwnerName || "").trim(),
//       type: b.type,
//       status: b.status,

//       ...parent,

//    transitionPlacement: cleanEnum(b.transitionPlacement, "below"),
// transitionType: cleanEnum(b.transitionType, "fade"),
// profilePosition: cleanEnum(b.profilePosition, "center"),
// orientation: cleanEnum(b.orientation, "landscape"),
// profileShape: cleanEnum(b.profileShape, "circle"),
//     };

//     const file = getFileInfo(req.files, "file");
//     const frame = getFileInfo(req.files, "frameFile");

//     if (file) {
//       data.file = file.url;
//       data.filePublicId = file.public_id;
//     }

//     if (frame) {
//       data.frameFile = frame.url;
//       data.frameFilePublicId = frame.public_id;
//     }

//     const updated = await Template.findByIdAndUpdate(
//   id,
//   data,
//   {
//     new: true,
//     runValidators: true  
//   }
// )
//   .populate("category")
//   .populate("politician")
//   .populate("religious")
//   .populate("birthday")
//   .populate("anniversary")
//   .populate("festival");


//     res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // ---------------------- DELETE TEMPLATE ----------------------
// exports.deleteTemplate = async (req, res) => {
//   try {
//     await Template.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- TOGGLE STATUS ----------------------
// exports.updateStatus = async (req, res) => {
//   try {
//     const t = await Template.findById(req.params.id);
//     if (!t)
//       return res.status(404).json({ success: false, message: "Not found" });

//     t.status = t.status === "active" ? "inactive" : "active";
//     await t.save();

//     const updated = await Template.findById(t._id)
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival");

//     res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("Status update error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- BULK DELETE ----------------------
// exports.bulkDeleteTemplates = async (req, res) => {
//   try {
//     await Template.deleteMany({ _id: { $in: req.body.ids } });
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Bulk delete error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- IMPORT CSV FILE ----------------------
// exports.importTemplatesFromCsvFile = async (req, res) => {
//   try {
//     if (!req.file)
//       return res.status(400).json({ success: false, message: "CSV required" });

//     const rows = await importFromCsv(req.file.path);
//     let created = 0;

//     for (const r of rows) {
//       const title = (r.title || "").trim();
//       if (!title) continue;

//       let parentType = r.parentType;
//       let parentName = r.parent;

//       let parentId = null;

//       if (parentType === "Category") {
//         const c = await Category.findOne({ title: parentName });
//         if (c) parentId = c._id;
//       }
//       if (parentType === "Politician") {
//         const c = await Politician.findOne({ name: parentName });
//         if (c) parentId = c._id;
//       }
//       if (parentType === "Religious") {
//         const c = await Religious.findOne({ name: parentName });
//         if (c) parentId = c._id;
//       }

//       const parent = mapParent(parentType, parentId);

//       await Template.create({
//         title,
//         contentOwnerName: r.contentOwnerName || "",
//         type: r.type,
//         status: r.status,
//         ...parent,
//         file: r.file,
//         frameFile: r.frameFile,
//        transitionPlacement: cleanEnum(r.transitionPlacement, "below"),
// transitionType: cleanEnum(r.transitionType, "fade"),
// profilePosition: cleanEnum(r.profilePosition, "center"),
// orientation: cleanEnum(r.orientation, "landscape"),
// profileShape: cleanEnum(r.profileShape, "circle"),
//       });

//       created++;
//     }

//     fs.unlinkSync(req.file.path);
//     res.json({ success: true, created });
//   } catch (err) {
//     console.error("CSV Import Error", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- EXPORT CSV ----------------------
// exports.exportTemplatesToCsv = async (req, res) => {
//   try {
//     const templates = await Template.find()
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival");

//     const csvData = templates.map((t) => ({
//       title: t.title,
//        contentOwnerName: t.contentOwnerName || "",
//       type: t.type,
//       status: t.status,

//       parentType:
//         t.category
//           ? "Category"
//           : t.politician
//           ? "Politician"
//           : t.religious
//           ? "Religious"
//           : t.birthday
//           ? "Birthday"
//           : t.anniversary
//           ? "Anniversary"
//           : t.festival
//           ? "Festival"
//           : "",

//       parent:
//         t.category?.title ||
//         t.politician?.name ||
//         t.religious?.name ||
//         t.birthday?.title ||
//         t.anniversary?.title ||
//         t.festival?.title ||
//         "",

//       file: t.file || "",
//       frameFile: t.frameFile || "",
//       transitionPlacement: t.transitionPlacement,
//       profilePosition: t.profilePosition,
//       transitionType: t.transitionType,
//       orientation: t.orientation,
//       profileShape: t.profileShape,
//       profileSize: t.profileSize,
      
//     }));

//     const fields = [
//       "title",
//        "contentOwnerName",
//       "type",
//       "status",
//       "parentType",
//       "parent",
//       "file",
//       "frameFile",
//       "transitionPlacement",
//       "profilePosition",
//       "transitionType",
//       "orientation",
//       "profileSize",
//       "profileShape",
//     ];

//     const csv = exportToCsv(csvData, fields);

//     res.header("Content-Type", "text/csv");
//     res.attachment("templates.csv");
//     res.send(csv);
//   } catch (err) {
//     console.error("Export CSV Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// const Template = require("../models/templateModel");
// const Category = require("../models/categoryModel");
// const Politician = require("../models/politicianModel");
// const Religious = require("../models/religiousModel");
// const Anniversary = require("../models/Anniversary");
// const Birthday = require("../models/birthdayModel");
// const Festival = require("../models/Festival");

// const { exportToCsv, importFromCsv } = require("../utils/csv");
// const fs = require("fs");

// // ---------------------- FILE INFO HELPER ----------------------
// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj) return null;
//   const arr = filesObj[fieldName];
//   if (!arr || !arr.length) return null;
//   const f = arr[0];
//   return { url: f.path, public_id: f.filename };
// };

// // ---------------------- MAP PARENT TYPE → PARENT ID ----------------------
// const mapParent = (type, id) => {
//   return {
//     category: type === "Category" ? id : null,
//     politician: type === "Politician" ? id : null,
//     religious: type === "Religious" ? id : null,
//     birthday: type === "Birthday" ? id : null,
//     anniversary: type === "Anniversary" ? id : null,
//     festival: type === "Festival" ? id : null,
//   };
// };

// // ---------------------- GET TEMPLATES (Pagination + Search) ----------------------
// exports.getTemplates = async (req, res) => {
//   try {
//     let { page = 1, limit = 6, search = "" } = req.query;

//     page = Number(page);
//     limit = Number(limit);

//     const filter = {};

//     if (search.trim()) {
//       const regex = new RegExp(search.trim(), "i");
//       filter.$or = [{ title: regex }];
//     }

//     const total = await Template.countDocuments(filter);

//     const templates = await Template.find(filter)
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     res.json({
//       success: true,
//       templates,
//       total,
//       page,
//       pages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.error("getTemplates error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- CREATE TEMPLATE ----------------------
// exports.createTemplate = async (req, res) => {
//   try {
//     const b = req.body;

//     const parent = mapParent(b.parentType, b.parentId);

//     const file = getFileInfo(req.files, "file");
//     const frame = getFileInfo(req.files, "frameFile");

//     const doc = {
//       title: b.title,
//       type: b.type,
//       status: b.status,

//       ...parent,

//       file: file?.url || null,
//       filePublicId: file?.public_id || null,
//       frameFile: frame?.url || null,
//       frameFilePublicId: frame?.public_id || null,

//       transitionPlacement: b.transitionPlacement,
//       profilePosition: b.profilePosition,
//       transitionType: b.transitionType,
//       orientation: b.orientation,
//       profileSize: b.profileSize,
//       profileShape: b.profileShape,
//     };

//     const saved = await Template.create(doc);

//     const populated = await Template.findById(saved._id)
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival");

//     res.json({ success: true, template: populated });
//   } catch (err) {
//     console.error("Create error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- UPDATE TEMPLATE ----------------------
// exports.updateTemplate = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const b = req.body;

//     const parent = mapParent(b.parentType, b.parentId);

//     let data = {
//       title: b.title,
//       type: b.type,
//       status: b.status,

//       ...parent,

//       transitionPlacement: b.transitionPlacement,
//       profilePosition: b.profilePosition,
//       transitionType: b.transitionType,
//       orientation: b.orientation,
//       profileSize: b.profileSize,
//       profileShape: b.profileShape,
//     };

//     const file = getFileInfo(req.files, "file");
//     const frame = getFileInfo(req.files, "frameFile");

//     if (file) {
//       data.file = file.url;
//       data.filePublicId = file.public_id;
//     }

//     if (frame) {
//       data.frameFile = frame.url;
//       data.frameFilePublicId = frame.public_id;
//     }

//     const updated = await Template.findByIdAndUpdate(id, data, { new: true })
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival");

//     res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- DELETE TEMPLATE ----------------------
// exports.deleteTemplate = async (req, res) => {
//   try {
//     await Template.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- TOGGLE STATUS ----------------------
// exports.updateStatus = async (req, res) => {
//   try {
//     const t = await Template.findById(req.params.id);
//     if (!t)
//       return res.status(404).json({ success: false, message: "Not found" });

//     t.status = t.status === "active" ? "inactive" : "active";
//     await t.save();

//     const updated = await Template.findById(t._id)
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival");

//     res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("Status update error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- BULK DELETE ----------------------
// exports.bulkDeleteTemplates = async (req, res) => {
//   try {
//     await Template.deleteMany({ _id: { $in: req.body.ids } });
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Bulk delete error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- IMPORT CSV FILE ----------------------
// exports.importTemplatesFromCsvFile = async (req, res) => {
//   try {
//     if (!req.file)
//       return res.status(400).json({ success: false, message: "CSV required" });

//     const rows = await importFromCsv(req.file.path);
//     let created = 0;

//     for (const r of rows) {
//       const title = (r.title || "").trim();
//       if (!title) continue;

//       let parentType = r.parentType;
//       let parentName = r.parent;

//       let parentId = null;

//       if (parentType === "Category") {
//         const c = await Category.findOne({ title: parentName });
//         if (c) parentId = c._id;
//       }
//       if (parentType === "Politician") {
//         const c = await Politician.findOne({ name: parentName });
//         if (c) parentId = c._id;
//       }
//       if (parentType === "Religious") {
//         const c = await Religious.findOne({ name: parentName });
//         if (c) parentId = c._id;
//       }

//       const parent = mapParent(parentType, parentId);

//       await Template.create({
//         title,
//         type: r.type,
//         status: r.status,
//         ...parent,
//         file: r.file,
//         frameFile: r.frameFile,
//         transitionPlacement: r.transitionPlacement,
//         profilePosition: r.profilePosition,
//         transitionType: r.transitionType,
//         orientation: r.orientation,
//         profileSize: r.profileSize,
//         profileShape: r.profileShape,
//       });

//       created++;
//     }

//     fs.unlinkSync(req.file.path);
//     res.json({ success: true, created });
//   } catch (err) {
//     console.error("CSV Import Error", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- EXPORT CSV ----------------------
// exports.exportTemplatesToCsv = async (req, res) => {
//   try {
//     const templates = await Template.find()
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .populate("birthday")
//       .populate("anniversary")
//       .populate("festival");

//     const csvData = templates.map((t) => ({
//       title: t.title,
//       type: t.type,
//       status: t.status,

//       parentType:
//         t.category
//           ? "Category"
//           : t.politician
//           ? "Politician"
//           : t.religious
//           ? "Religious"
//           : t.birthday
//           ? "Birthday"
//           : t.anniversary
//           ? "Anniversary"
//           : t.festival
//           ? "Festival"
//           : "",

//       parent:
//         t.category?.title ||
//         t.politician?.name ||
//         t.religious?.name ||
//         t.birthday?.title ||
//         t.anniversary?.title ||
//         t.festival?.title ||
//         "",

//       file: t.file || "",
//       frameFile: t.frameFile || "",
//       transitionPlacement: t.transitionPlacement,
//       profilePosition: t.profilePosition,
//       transitionType: t.transitionType,
//       orientation: t.orientation,
//       profileSize: t.profileSize,
//       profileShape: t.profileShape,
//     }));

//     const fields = [
//       "title",
//       "type",
//       "status",
//       "parentType",
//       "parent",
//       "file",
//       "frameFile",
//       "transitionPlacement",
//       "profilePosition",
//       "transitionType",
//       "orientation",
//       "profileSize",
//       "profileShape",
//     ];

//     const csv = exportToCsv(csvData, fields);

//     res.header("Content-Type", "text/csv");
//     res.attachment("templates.csv");
//     res.send(csv);
//   } catch (err) {
//     console.error("Export CSV Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

const Template = require("../models/templateModel");
const Category = require("../models/categoryModel");
const Politician = require("../models/politicianModel");
const Religious = require("../models/religiousModel");
const Anniversary = require("../models/Anniversary");
const Birthday = require("../models/birthdayModel");
const Festival = require("../models/Festival");

const getSingleValue = (val) => {
  if (Array.isArray(val)) return val[0];
  return val;
};

const { exportToCsv, importFromCsv } = require("../utils/csv");
const fs = require("fs");

// ================= FILE HELPER =================
const getFileInfo = (files, field) => {
  if (!files || !files[field] || !files[field].length) return null;
  const f = files[field][0];
  return { url: f.path, public_id: f.filename };
};

// ================= MAP PARENT =================
const mapParent = (type, id) => ({
  category: type === "Category" ? id : null,
  politician: type === "Politician" ? id : null,
  religious: type === "Religious" ? id : null,
  birthday: type === "Birthday" ? id : null,
  anniversary: type === "Anniversary" ? id : null,
  festival: type === "Festival" ? id : null,
});

// ================= POPULATE =================
const populateAll = (q) =>
  q
    .populate("category")
    .populate("politician")
    .populate("religious")
    .populate("birthday")
    .populate("anniversary")
    .populate("festival");


exports.getTemplates = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 6,
      search = "",
      parentType,
      parentId,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    // 🔍 Search
    if (search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    // ⭐⭐⭐ PARENT FILTER (MOST IMPORTANT)
    if (parentType && parentId) {
      if (parentType === "Category") filter.category = parentId;
      if (parentType === "Politician") filter.politician = parentId;
      if (parentType === "Religious") filter.religious = parentId;
      if (parentType === "Birthday") filter.birthday = parentId;
      if (parentType === "Anniversary") filter.anniversary = parentId;
      if (parentType === "Festival") filter.festival = parentId;
    }

    const total = await Template.countDocuments(filter);

    const templates = await populateAll(
      Template.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
    );

    res.json({
      success: true,
      templates,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




exports.createTemplate = async (req, res) => {
  try {
    const b = req.body;

    // 🔍 DEBUG (1 baar dekh lo console me)
    console.log("BODY:", b);
 // ✅ FIX: array → single value
    const parentType = getSingleValue(b.parentType);
    const parentId = getSingleValue(b.parentId);

    const parent = {
      category: parentType === "Category" ? parentId : null,
      politician: parentType === "Politician" ? parentId : null,
      religious: parentType === "Religious" ? parentId : null,
      birthday: parentType === "Birthday" ? parentId : null,
      anniversary: parentType === "Anniversary" ? parentId : null,
      festival: parentType === "Festival" ? parentId : null,
    };

    const file = getFileInfo(req.files, "file");
    const frame = getFileInfo(req.files, "frameFile");

    const doc = {
      title: b.title,
      type: b.type,
      status: b.status || "active",

      ...parent,

      file: file?.url || null,
      filePublicId: file?.public_id || null,
      frameFile: frame?.url || null,
      frameFilePublicId: frame?.public_id || null,

      // TRANSITION
      transition: {
        placement: b.transitionPlacement || "below",
        type: b.transitionType || "fade",
        duration: Number(b.transitionDuration) || 0.8,
      },

      // ANIMATION
      animation: {
        profile: {
          effect: b.profileAnimation || "none",
          delay: Number(b.profileDelay) || 0,
          duration: Number(b.profileDuration) || 0.6,
        },
        text: {
          effect: b.textAnimation || "none",
          delay: Number(b.textDelay) || 0,
          duration: Number(b.textDuration) || 0.5,
        },
      },

      // PROFILE
      profile: {
        position: b.profilePosition || "center",
        size: b.profileSize || "120px",
        shape: b.profileShape || "circle",
      },

      fileZoom: Number(b.fileZoom) || 1,
      fileX: Number(b.fileX) || 0,
      fileY: Number(b.fileY) || 0,

      frameZoom: Number(b.frameZoom) || 1,
      frameX: Number(b.frameX) || 0,
      frameY: Number(b.frameY) || 0,

      orientation: b.orientation || "landscape",
    };

    const saved = await Template.create(doc);
    const populated = await populateAll(Template.findById(saved._id));

    res.json({ success: true, template: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ============================================================
// UPDATE TEMPLATE
// ============================================================
exports.updateTemplate = async (req, res) => {
  try {
    const id = req.params.id;
    const b = req.body;

    const parent = mapParent(b.parentType, b.parentId);

    let data = {
      title: b.title,
      type: b.type,
      status: b.status,

      ...parent,

      transition: {
        placement: b.transitionPlacement,
        type: b.transitionType,
        duration: Number(b.transitionDuration),
      },

      animation: {
        profile: {
          effect: b.profileAnimation,
          delay: Number(b.profileDelay),
          duration: Number(b.profileDuration),
        },
        text: {
          effect: b.textAnimation,
          delay: Number(b.textDelay),
          duration: Number(b.textDuration),
        },
      },

      profile: {
        position: b.profilePosition,
        size: b.profileSize,
        shape: b.profileShape,
      },

      // ---------- POSITION & SCALE ----------
      fileZoom: Number(b.fileZoom),
      fileX: Number(b.fileX),
      fileY: Number(b.fileY),

      frameZoom: Number(b.frameZoom),
      frameX: Number(b.frameX),
      frameY: Number(b.frameY),

      orientation: b.orientation,
    };

    const file = getFileInfo(req.files, "file");
    const frame = getFileInfo(req.files, "frameFile");

    if (file) {
      data.file = file.url;
      data.filePublicId = file.public_id;
    }
    if (frame) {
      data.frameFile = frame.url;
      data.frameFilePublicId = frame.public_id;
    }

    const updated = await populateAll(
      Template.findByIdAndUpdate(id, data, { new: true })
    );

    res.json({ success: true, template: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ============================================================
// DELETE TEMPLATE
// ============================================================
exports.deleteTemplate = async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ============================================================
// TOGGLE STATUS
// ============================================================
exports.updateStatus = async (req, res) => {
  try {
    const t = await Template.findById(req.params.id);
    if (!t) return res.status(404).json({ success: false });

    t.status = t.status === "active" ? "inactive" : "active";
    await t.save();

    const populated = await populateAll(Template.findById(t._id));
    res.json({ success: true, template: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ============================================================
// BULK DELETE
// ============================================================
exports.bulkDeleteTemplates = async (req, res) => {
  try {
    await Template.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ============================================================
// IMPORT CSV
// ============================================================
exports.importTemplatesFromCsvFile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "CSV required" });

    const rows = await importFromCsv(req.file.path);
    let created = 0;

    for (const r of rows) {
      if (!r.title) continue;

      let parentId = null;
      if (r.parentType === "Category")
        // parentId = (await Category.findOne({ title: r.parent }))?._id;
      Category.findOne({ categoryName: r.parent })

      if (r.parentType === "Politician")
        parentId = (await Politician.findOne({ name: r.parent }))?._id;
      if (r.parentType === "Religious")
        parentId = (await Religious.findOne({ name: r.parent }))?._id;

      const parent = mapParent(r.parentType, parentId);

      await Template.create({
        title: r.title,
        type: r.type,
        status: r.status,
        ...parent,

        file: r.file || null,
        frameFile: r.frameFile || null,

        transition: {
          placement: r.transitionPlacement,
          type: r.transitionType,
          duration: Number(r.transitionDuration),
        },

        profile: {
          position: r.profilePosition,
          size: r.profileSize,
          shape: r.profileShape,
        },

        fileZoom: Number(r.fileZoom) || 1,
        fileX: Number(r.fileX) || 0,
        fileY: Number(r.fileY) || 0,

        frameZoom: Number(r.frameZoom) || 1,
        frameX: Number(r.frameX) || 0,
        frameY: Number(r.frameY) || 0,

        orientation: r.orientation,
      });

      created++;
    }

    fs.unlinkSync(req.file.path);
    res.json({ success: true, created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ============================================================
// EXPORT CSV
// ============================================================
exports.exportTemplatesToCsv = async (req, res) => {
  try {
    const templates = await populateAll(Template.find());

    const csvData = templates.map((t) => ({
      title: t.title,
      type: t.type,
      status: t.status,

      parentType:
        t.category ? "Category" :
        t.politician ? "Politician" :
        t.religious ? "Religious" :
        t.birthday ? "Birthday" :
        t.anniversary ? "Anniversary" :
        t.festival ? "Festival" : "",

      parent:
        // t.category?.title ||
        t.category?.categoryName ||
        t.politician?.name ||
        t.religious?.name ||
        t.birthday?.title ||
        t.anniversary?.title ||
        t.festival?.title ||
        "",

      file: t.file,
      frameFile: t.frameFile,

      transitionPlacement: t.transition?.placement,
      transitionType: t.transition?.type,
      transitionDuration: t.transition?.duration,

      profilePosition: t.profile?.position,
      profileSize: t.profile?.size,
      profileShape: t.profile?.shape,

      fileZoom: t.fileZoom,
      fileX: t.fileX,
      fileY: t.fileY,

      frameZoom: t.frameZoom,
      frameX: t.frameX,
      frameY: t.frameY,

      orientation: t.orientation,
    }));

    const fields = Object.keys(csvData[0] || {});
    const csv = exportToCsv(csvData, fields);

    res.header("Content-Type", "text/csv");
    res.attachment("templates.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
