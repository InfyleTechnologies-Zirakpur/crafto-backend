// // // <<<<<<< HEAD
// // // // const mongoose = require("mongoose");

// // // // const politicianSchema = new mongoose.Schema({
// // // //   title: { type: String, required: true },
// // // //   abbreviation: { type: String, required: true },
// // // //   logo: { type: String, default: null }, // Cloudinary URL
// // // //   status: { type: String, enum: ["active", "inactive"], default: "active" },
// // // // }, { timestamps: true });

// // // // module.exports = mongoose.model("Politician", politicianSchema);
// // // const mongoose = require("mongoose");

// // // const politicianSchema = new mongoose.Schema(
// // //   {
// // //     title: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     abbreviation: String,
// // //     logo: String,
// // //     status: {
// // //       type: String,
// // //       enum: ["active", "inactive"],
// // //       default: "active",
// // //     },
// // //     religious: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Religious",
// // //     },
// // //     language: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Language",
// // //     },
// // //   },
// // //   { timestamps: true }
// // // );
// // // =======
// // // const mongoose = require("mongoose");

// // // const politicianSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   abbreviation: { type: String, required: true },
// // //   logo: { type: String, default: null }, // Cloudinary URL
// // //   status: { type: String, enum: ["active", "inactive"], default: "active" },
// // // }, { timestamps: true });
// // // >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e

// // // module.exports = mongoose.model("Politician", politicianSchema);
// // const mongoose = require("mongoose");

// // const politicianSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     abbreviation: { type: String, required: true },
// //     logo: { type: String, default: null }, // Cloudinary URL
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },

// //     // Optional relations
// //     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },
// //     language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", default: null },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Politician", politicianSchema);


// // const mongoose = require("mongoose");

// // const politicianSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     abbreviation: { type: String, required: true },
// //     logo: { type: String, default: null },
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },
// //     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },
// //     language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", default: null },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Politician", politicianSchema);

// const mongoose = require("mongoose");

// const politicianSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     abbreviation: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // 🔥 LOGO (Image / Video)
//     logo: {
//       type: String, // Cloudinary URL
//       default: null,
//     },

//     logoType: {
//       type: String,
//       enum: ["image", "video"], // 🔥 choice
//       default: "image",
//     },

//     logoPublicId: {
//       type: String, // Cloudinary public_id (delete/update ke liye)
//       default: null,
//     },

//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },

//     religious: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Religious",
//       default: null,
//     },

//     language: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Language",
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Politician", politicianSchema);

const mongoose = require("mongoose");

const politicianSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    abbreviation: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 LOGO (Image / Video)
    logo: {
      type: String, // Cloudinary URL
      default: null,
    },

    logoType: {
      type: String,
      enum: ["image", "video"], // 🔥 choice
      default: "image",
    },

    logoPublicId: {
      type: String, // Cloudinary public_id (delete/update ke liye)
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Politician", politicianSchema);

