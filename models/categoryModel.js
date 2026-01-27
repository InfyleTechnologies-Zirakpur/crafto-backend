
// <<<<<<< HEAD
// // const mongoose = require("mongoose");

// // const categorySchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
// //   filePath: { type: String, default: null }, // Cloudinary URL
// //   status: { type: String, enum: ["active", "inactive"], default: "active" },
// // }, { timestamps: true });

// // module.exports = mongoose.model("Category", categorySchema);
// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
//     filePath: { type: String, default: null },
//     status: { type: String, enum: ["active", "inactive"], default: "active" },

//     // New relations
//     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },
//     language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", default: null },
//   },
//   { timestamps: true }
// );
// =======

// // const mongoose = require("mongoose");

// // const CategorySchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true, trim: true },
// //     orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
// //     filePath: { type: String }, // for image/video file URL
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Category", CategorySchema);
// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
//   filePath: { type: String, default: null }, // Cloudinary URL
//   status: { type: String, enum: ["active", "inactive"], default: "active" },
// }, { timestamps: true });
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e

// module.exports = mongoose.model("Category", categorySchema);


// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
//     filePath: { type: String, default: null }, // Cloudinary URL
//     status: { type: String, enum: ["active", "inactive"], default: "active" },

//     // Optional relations
//     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },
//     language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", default: null },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Category", categorySchema);

// const mongoose = require("mongoose");

// const CategorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     orientation: { type: String, default: "portrait" },
//     status: { type: String, default: "active" },

//     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },
//     language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", default: null },

//     filePath: { type: String, default: "" },
//     filePublicId: { type: String, default: "" },

//     // ⭐ NEW FEATURE: FESTIVAL CATEGORY
//     isFestivalCategory: { type: Boolean, default: false }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Category", CategorySchema);

const mongoose = require("mongoose"); 

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    orientation: { type: String, default: "portrait" },
    status: { type: String, default: "active" },

    religious: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Religious",
      default: null,
    },

    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      default: null,
    },

    filePath: { type: String, default: "" },
    filePublicId: { type: String, default: "" },

    // ⭐ FESTIVAL FLAG
    isFestivalCategory: { type: Boolean, default: false },

    // ⭐ FESTIVAL LINK
    festival: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Festival",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
