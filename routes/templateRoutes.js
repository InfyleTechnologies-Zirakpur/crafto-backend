

// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");

// // // const {
// // //   getTemplates,
// // //   createTemplate,
// // //   updateTemplate,
// // //   deleteTemplate,
// // //   updateStatus,
// // //   bulkDeleteTemplates,
// // //   importTemplatesFromCsv
// // // } = require("../controllers/templateController");

// // // // STORAGE
// // // const storage = new CloudinaryStorage({
// // //   cloudinary,
// // //   params: async (req, file) => ({
// // //     folder: file.fieldname === "frameFile" ? "templates/frames" : "templates/files",
// // //     resource_type: file.mimetype.includes("video") ? "video" : "image",
// // //     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
// // //   }),
// // // });

// // // const upload = multer({ storage });

// // // // ---------------------
// // // // CRUD
// // // // ---------------------
// // // router.get("/", getTemplates);

// // // router.post(
// // //   "/",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   createTemplate
// // // );

// // // router.put(
// // //   "/:id",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   updateTemplate
// // // );

// // // router.delete("/:id", deleteTemplate);

// // // // ---------------------
// // // // STATUS UPDATE
// // // // ---------------------
// // // router.patch("/:id/status", updateStatus);

// // // // ---------------------
// // // // BULK DELETE
// // // // ---------------------
// // // router.post("/bulk-delete", bulkDeleteTemplates);

// // // // ---------------------
// // // // CSV IMPORT (FIXED)
// // // // ---------------------
// // // router.post("/import-csv", importTemplatesFromCsv);

// // // module.exports = router;



// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");

// // // const {
// // //   getTemplates,
// // //   createTemplate,
// // //   updateTemplate,
// // //   deleteTemplate,
// // //   updateStatus,
// // //   bulkDeleteTemplates,
// // //   importTemplatesFromCsv
// // // } = require("../controllers/templateController");

// // // router.use(express.json({ limit: "50mb" }));

// // // const storage = new CloudinaryStorage({
// // //   cloudinary,
// // //   params: async (req, file) => ({
// // //     folder: file.fieldname === "frameFile" ? "templates/frames" : "templates/files",
// // //     resource_type: file.mimetype.includes("video") ? "video" : "image"
// // //   })
// // // });

// // // const upload = multer({ storage });

// // // // ROUTES
// // // router.get("/", getTemplates);
// // // router.post("/", upload.fields([{ name: "file" }, { name: "frameFile" }]), createTemplate);
// // // router.put("/:id", upload.fields([{ name: "file" }, { name: "frameFile" }]), updateTemplate);
// // // router.delete("/:id", deleteTemplate);
// // // router.patch("/:id/status", updateStatus);
// // // router.post("/bulk-delete", bulkDeleteTemplates);
// // // router.post("/import-csv", importTemplatesFromCsv);

// // // module.exports = router;


// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");

// // // const csvUpload = require("../middleware/csvUpload");

// // // const {
// // //   getTemplates,
// // //   createTemplate,
// // //   updateTemplate,
// // //   deleteTemplate,
// // //   updateStatus,
// // //   bulkDeleteTemplates,
// // //   importTemplatesFromCsv,      // JSON array import
// // //   importTemplatesFromCsvFile,  // File import
// // //   exportTemplatesToCsv         // CSV export
// // // } = require("../controllers/templateController");

// // // router.use(express.json({ limit: "50mb" }));

// // // // CLOUDINARY STORAGE
// // // const storage = new CloudinaryStorage({
// // //   cloudinary,
// // //   params: async (req, file) => ({
// // //     folder: file.fieldname === "frameFile" ? "templates/frames" : "templates/files",
// // //     resource_type: file.mimetype.includes("video") ? "video" : "image"
// // //   })
// // // });

// // // const upload = multer({ storage });

// // // // ROUTES
// // // router.get("/", getTemplates);
// // // router.post("/", upload.fields([{ name: "file" }, { name: "frameFile" }]), createTemplate);
// // // router.put("/:id", upload.fields([{ name: "file" }, { name: "frameFile" }]), updateTemplate);
// // // router.delete("/:id", deleteTemplate);
// // // router.patch("/:id/status", updateStatus);
// // // router.post("/bulk-delete", bulkDeleteTemplates);

// // // // CSV IMPORT / EXPORT
// // // router.post("/import-csv", importTemplatesFromCsv);                      // JSON Array
// // // router.post("/import-csv-file", csvUpload.single("csv"), importTemplatesFromCsvFile); // File Upload
// // // router.get("/export-csv", exportTemplatesToCsv);                        // Export

// // // module.exports = router;



// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");

// // // const csvUpload = require("../middleware/csvUpload");

// // // const {
// // //   getTemplates,
// // //   createTemplate,
// // //   updateTemplate,
// // //   deleteTemplate,
// // //   updateStatus,
// // //   bulkDeleteTemplates,
// // //   importTemplatesFromCsv,
// // //   importTemplatesFromCsvFile,
// // //   exportTemplatesToCsv
// // // } = require("../controllers/templateController");

// // // router.use(express.json({ limit: "50mb" }));

// // // // ========================================================
// // // //                 CLOUDINARY FILE STORAGE
// // // // ========================================================
// // // const storage = new CloudinaryStorage({
// // //   cloudinary,
// // //   params: async (req, file) => ({
// // //     folder:
// // //       file.fieldname === "frameFile"
// // //         ? "templates/frames"
// // //         : "templates/files",

// // //     resource_type: file.mimetype.includes("video") ? "video" : "image"
// // //   })
// // // });

// // // const upload = multer({ storage });

// // // // ========================================================
// // // //                     TEMPLATE ROUTES
// // // // ========================================================

// // // // Get templates (with search + pagination)
// // // router.get("/", getTemplates);

// // // // Create template
// // // router.post(
// // //   "/",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   createTemplate
// // // );

// // // // Update template
// // // router.put(
// // //   "/:id",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   updateTemplate
// // // );

// // // // Delete template
// // // router.delete("/:id", deleteTemplate);

// // // // Update status (active/inactive)
// // // // router.patch("/:id/status", updateStatus);

// // // // Toggle active/inactive status
// // // router.put("/toggle-status/:id", updateStatus);


// // // // Bulk delete templates
// // // router.post("/bulk-delete", bulkDeleteTemplates);

// // // // ========================================================
// // // //                     CSV IMPORT & EXPORT
// // // // ========================================================

// // // // Import JSON array
// // // router.post("/import-csv", importTemplatesFromCsv);

// // // // Import CSV File
// // // router.post(
// // //   "/import-csv-file",
// // //   csvUpload.single("csv"),
// // //   importTemplatesFromCsvFile
// // // );

// // // // Export CSV
// // // router.get("/export-csv", exportTemplatesToCsv);

// // // module.exports = router;


// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");

// // // const csvUpload = require("../middleware/csvUpload");

// // // const {
// // //   getTemplates,
// // //   createTemplate,
// // //   updateTemplate,
// // //   deleteTemplate,
// // //   updateStatus,
// // //   bulkDeleteTemplates,
// // //   importTemplatesFromCsvFile,
// // //   exportTemplatesToCsv
// // // } = require("../controllers/templateController");

// // // router.use(express.json({ limit: "50mb" }));

// // // // ========================================================
// // // //                 CLOUDINARY FILE STORAGE
// // // // ========================================================
// // // const storage = new CloudinaryStorage({
// // //   cloudinary,
// // //   params: async (req, file) => ({
// // //     folder:
// // //       file.fieldname === "frameFile"
// // //         ? "templates/frames"
// // //         : "templates/files",

// // //     resource_type: file.mimetype.includes("video") ? "video" : "image"
// // //   })
// // // });

// // // const upload = multer({ storage });

// // // // ========================================================
// // // //                     TEMPLATE ROUTES
// // // // ========================================================

// // // // Get templates
// // // router.get("/", getTemplates);

// // // // Create template
// // // router.post(
// // //   "/",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   createTemplate
// // // );

// // // // Update template
// // // router.put(
// // //   "/:id",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   updateTemplate
// // // );

// // // // Delete template
// // // router.delete("/:id", deleteTemplate);

// // // // Toggle active/inactive
// // // router.put("/toggle-status/:id", updateStatus);

// // // // Bulk delete
// // // router.post("/bulk-delete", bulkDeleteTemplates);

// // // // ========================================================
// // // //                     CSV IMPORT & EXPORT
// // // // ========================================================

// // // // IMPORT CSV FILE ONLY
// // // router.post(
// // //   "/import-csv-file",
// // //   csvUpload.single("csv"),
// // //   importTemplatesFromCsvFile
// // // );

// // // // EXPORT CSV
// // // router.get("/export-csv", exportTemplatesToCsv);

// // // module.exports = router;


// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("../config/cloudinary");

// // const csvUpload = require("../middleware/csvUpload");

// // const {
// //   getTemplates,
// //   createTemplate,
// //   updateTemplate,
// //   deleteTemplate,
// //   updateStatus,
// //   bulkDeleteTemplates,
// //   importTemplatesFromCsvFile,
// //   exportTemplatesToCsv
// // } = require("../controllers/templateController");

// // // 🔥 FIX HERE
// // router.use(express.json({ limit: "50mb" }));
// // router.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // // ========================================================
// // //                 CLOUDINARY FILE STORAGE
// // // ========================================================
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: async (req, file) => ({
// //     folder:
// //       file.fieldname === "frameFile"
// //         ? "templates/frames"
// //         : "templates/files",
// //     resource_type: file.mimetype.includes("video") ? "video" : "image"
// //   })
// // });

// // const upload = multer({ storage });

// // // ========================================================
// // //                     TEMPLATE ROUTES
// // // ========================================================

// // // Get templates
// // router.get("/", getTemplates);

// // // Create template
// // router.post(
// //   "/",
// //   upload.fields([
// //     { name: "file", maxCount: 1 },
// //     { name: "frameFile", maxCount: 1 }
// //   ]),
// //   createTemplate
// // );

// // // Update template
// // router.put(
// //   "/:id",
// //   upload.fields([
// //     { name: "file", maxCount: 1 },
// //     { name: "frameFile", maxCount: 1 },
// //       { name: "contentOwnerName", maxCount: 1 } 
// //   ]),
// //   updateTemplate
// // );

// // // Delete template
// // router.delete("/:id", deleteTemplate);

// // // Toggle active/inactive
// // router.put("/toggle-status/:id", updateStatus);

// // // Bulk delete
// // router.post("/bulk-delete", bulkDeleteTemplates);

// // // ========================================================
// // //                     CSV IMPORT & EXPORT
// // // ========================================================

// // // IMPORT CSV FILE ONLY
// // router.post(
// //   "/import-csv-file",
// //   csvUpload.single("csv"),
// //   importTemplatesFromCsvFile
// // );

// // // EXPORT CSV
// // router.get("/export-csv", exportTemplatesToCsv);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const csvUpload = require("../middleware/csvUpload");

// const {
//   getTemplates,
//   createTemplate,
//   updateTemplate,
//   deleteTemplate,
//   updateStatus,
//   bulkDeleteTemplates,
//   importTemplatesFromCsvFile,
//   exportTemplatesToCsv
// } = require("../controllers/templateController");

// router.use(express.json({ limit: "50mb" }));

// // ========================================================
// //                 CLOUDINARY FILE STORAGE
// // ========================================================
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder:
//       file.fieldname === "frameFile"
//         ? "templates/frames"
//         : "templates/files",

//     resource_type: file.mimetype.includes("video") ? "video" : "image"
//   })
// });

// const upload = multer({ storage });

// // ========================================================
// //                     TEMPLATE ROUTES
// // ========================================================

// // Get templates
// router.get("/", getTemplates);

// // Create template
// router.post(
//   "/",
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 }
//   ]),
//   createTemplate
// );

// // Update template
// router.put(
//   "/:id",
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 }
//   ]),
//   updateTemplate
// );

// // Delete template
// router.delete("/:id", deleteTemplate);

// // Toggle active/inactive
// router.put("/toggle-status/:id", updateStatus);

// // Bulk delete
// router.post("/bulk-delete", bulkDeleteTemplates);

// // ========================================================
// //                     CSV IMPORT & EXPORT
// // ========================================================

// // IMPORT CSV FILE ONLY
// router.post(
//   "/import-csv-file",
//   csvUpload.single("csv"),
//   importTemplatesFromCsvFile
// );

// // EXPORT CSV
// router.get("/export-csv", exportTemplatesToCsv);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const csvUpload = require("../middleware/csvUpload");

const {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  updateStatus,
  bulkDeleteTemplates,
  importTemplatesFromCsvFile,
  exportTemplatesToCsv,
} = require("../controllers/templateController");

// ========================================================
//                 BODY PARSER
// ========================================================
router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ extended: true }));

// ========================================================
//                 CLOUDINARY STORAGE
// ========================================================
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder:
      file.fieldname === "frameFile"
        ? "templates/frames"
        : "templates/files",

    resource_type: file.mimetype.startsWith("video") ? "video" : "image",
  }),
});

const upload = multer({ storage });

// ========================================================
//                     TEMPLATE ROUTES
// ========================================================

// GET (pagination + search)
router.get("/", getTemplates);

// CREATE
router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "frameFile", maxCount: 1 },
  ]),
  createTemplate
);

// UPDATE
router.put(
  "/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "frameFile", maxCount: 1 },
  ]),
  updateTemplate
);

// DELETE
router.delete("/:id", deleteTemplate);

// TOGGLE STATUS
router.put("/toggle-status/:id", updateStatus);

// BULK DELETE
router.post("/bulk-delete", bulkDeleteTemplates);

// ========================================================
//                  CSV IMPORT / EXPORT
// ========================================================

// IMPORT CSV
router.post(
  "/import-csv-file",
  csvUpload.single("csv"),
  importTemplatesFromCsvFile
);

// EXPORT CSV
router.get("/export-csv", exportTemplatesToCsv);

module.exports = router;
