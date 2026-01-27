// // const mongoose = require("mongoose");

// // const BirthdaySchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     name: { type: String, required: true },
// //     date: { type: String, required: true },
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },

// //     photo: { type: String, default: "" },
// //     photoPublicId: { type: String, default: "" },

// //     banner: { type: String, default: "" },
// //     bannerPublicId: { type: String, default: "" },

// //     zoom: { type: Number, default: 1 },
// //     offsetX: { type: Number, default: 0 },
// //     offsetY: { type: Number, default: 0 },

// //     bannerZoom: { type: Number, default: 1 },
// //     bannerX: { type: Number, default: 0 },
// //     bannerY: { type: Number, default: 0 },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Birthday", BirthdaySchema);



// const mongoose = require("mongoose");

// const BirthdaySchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     name: { type: String, required: true },
//     date: { type: String, required: true },

//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },

//     /* ===============================
//        PHOTO (IMAGE / VIDEO)
//     =============================== */
//     photo: { type: String, default: "" },          // Cloudinary URL
//     photoPublicId: { type: String, default: "" },  // Cloudinary public_id
//     photoType: {
//       type: String,
//       enum: ["image", "video"],
//       default: "image",
//     },

//     /* ===============================
//        BANNER (IMAGE ONLY)
//     =============================== */
//     banner: { type: String, default: "" },
//     bannerPublicId: { type: String, default: "" },

//     /* ===============================
//        PHOTO CONTROLS
//     =============================== */
//     zoom: { type: Number, default: 1 },
//     offsetX: { type: Number, default: 0 },
//     offsetY: { type: Number, default: 0 },

//     /* ===============================
//        BANNER CONTROLS
//     =============================== */
//     bannerZoom: { type: Number, default: 1 },
//     bannerX: { type: Number, default: 0 },
//     bannerY: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Birthday", BirthdaySchema);


const mongoose = require("mongoose");

const BirthdaySchema = new mongoose.Schema(
  {
    /* ===============================
       BASIC INFO
    =============================== */
    title: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    /* ===============================
       PHOTO (IMAGE / VIDEO)
    =============================== */
    photo: { type: String, default: "" },          // Cloudinary URL
    photoPublicId: { type: String, default: "" },
    photoType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    /* ===============================
       BANNER (IMAGE)
    =============================== */
    banner: { type: String, default: "" },
    bannerPublicId: { type: String, default: "" },

    /* ===============================
       PHOTO CONTROLS
    =============================== */
    zoom: { type: Number, default: 1 },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },

    /* ===============================
       BANNER CONTROLS
    =============================== */
    bannerZoom: { type: Number, default: 1 },
    bannerX: { type: Number, default: 0 },
    bannerY: { type: Number, default: 0 },

    /* ===============================
       PROFILE SETTINGS
    =============================== */
    profile: {
      size: { type: Number, default: 140 },
      shape: {
        type: String,
        enum: ["circle", "square", "rounded"],
        default: "circle",
      },
      position: {
        type: String,
        enum: [
          "topLeft", "topCenter", "topRight",
          "centerLeft", "center", "centerRight",
          "bottomLeft", "bottomCenter", "bottomRight",
        ],
        default: "center",
      },
    },

    /* ===============================
       PROFILE ANIMATION
    =============================== */
    animation: {
      profile: {
        effect: {
          type: String,
          enum: ["none", "fadeIn", "slideUp", "zoomIn", "rotateIn"],
          default: "fadeIn",
        },
        duration: { type: Number, default: 0.6 }, // seconds
        delay: { type: Number, default: 0 },      // seconds
      },
    },

    /* ===============================
       TRANSITION
    =============================== */
    transition: {
      type: {
        type: String,
        enum: [
          "fade",
          "slideFromBottom",
          "slideFromTop",
          "slideFromLeft",
          "slideFromRight",
          "zoomIn",
        ],
        default: "fade",
      },
      duration: { type: Number, default: 0.8 }, // seconds
      delay: { type: Number, default: 0 },      // seconds
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Birthday", BirthdaySchema);
