// // const mongoose = require("mongoose");

// // const FestivalSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     template: { type: String, default: "" },
// //     transition: { type: String, default: "" },
// //     status: { type: String, default: "active" },
// //     // logo: Cloudinary URL
// //     logo: { type: String, default: "" },
// //     // logoPublicId: cloudinary public_id (useful for delete)
// //     logoPublicId: { type: String, default: "" }
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Festival", FestivalSchema);

// // const mongoose = require("mongoose");

// // const FestivalSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     template: { type: String, default: "" },
// //     transition: { type: String, default: "" },
// //     status: { type: String, default: "active" },

// //     // Cloudinary Image
// //     logo: { type: String, default: "" },         // URL
// //     logoPublicId: { type: String, default: "" }, // public_id saved by Cloudinary

// //     // Image Transform sliders
// //     zoom: { type: Number, default: 1 },
// //     offsetX: { type: Number, default: 0 },
// //     offsetY: { type: Number, default: 0 }
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Festival", FestivalSchema);


// // const mongoose = require("mongoose");

// // const FestivalSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     template: { type: String, default: "" },
// //     transition: { type: String, default: "" },
// //     status: { type: String, default: "active" },

// //     // ⭐ LOGO (Cloudinary)
// //     logo: { type: String, default: "" },          // Logo URL
// //     logoPublicId: { type: String, default: "" },  // Cloudinary public_id

// //     // ⭐ LOGO Transform Controls
// //     zoom: { type: Number, default: 1 },
// //     offsetX: { type: Number, default: 0 },
// //     offsetY: { type: Number, default: 0 },

// //     // ⭐ BANNER (Cloudinary)
// //     banner: { type: String, default: "" },         // Banner URL
// //     bannerPublicId: { type: String, default: "" }, // Cloudinary public_id

// //     // ⭐ BANNER Transform Controls
// //     bannerZoom: { type: Number, default: 1 },
// //     bannerX: { type: Number, default: 0 },
// //     bannerY: { type: Number, default: 0 }
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Festival", FestivalSchema);

// // const mongoose = require("mongoose");

// // const FestivalSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     template: { type: String, default: "" },
// //     transition: { type: String, default: "" },
// //     status: { type: String, default: "active" },

// //     // ⭐ LOGO (Image / Video)
// //     logo: { type: String, default: "" },          
// //     logoPublicId: { type: String, default: "" },

// //     // 🔥 IMPORTANT
// //     logoType: {
// //       type: String,
// //       enum: ["image", "video"],
// //       default: "image",
// //     },

// //     // ⭐ LOGO Transform Controls (IMAGE only)
// //     zoom: { type: Number, default: 1 },
// //     offsetX: { type: Number, default: 0 },
// //     offsetY: { type: Number, default: 0 },

// //     // ⭐ BANNER (Image only)
// //     banner: { type: String, default: "" },
// //     bannerPublicId: { type: String, default: "" },

// //     // ⭐ BANNER Transform Controls
// //     bannerZoom: { type: Number, default: 1 },
// //     bannerX: { type: Number, default: 0 },
// //     bannerY: { type: Number, default: 0 },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Festival", FestivalSchema);

// const mongoose = require("mongoose");

// const FestivalSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     template: { type: String, default: "" },
//     transition: { type: String, default: "" },

//     // 🔥 STATUS
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },

//     // 🕒 TIMELINE (⭐ IMPORTANT ADDITION ⭐)
//     startAt: {
//       type: Date,
//       default: Date.now, // publish time
//     },

//     expireAt: {
//       type: Date,
//       required: true, // 🔥 MUST give expiry date
//     },

//     // ⭐ LOGO (Image / Video)
//     logo: { type: String, default: "" },
//     logoPublicId: { type: String, default: "" },

//     logoType: {
//       type: String,
//       enum: ["image", "video"],
//       default: "image",
//     },

//     // ⭐ LOGO Transform
//     zoom: { type: Number, default: 1 },
//     offsetX: { type: Number, default: 0 },
//     offsetY: { type: Number, default: 0 },

//     // ⭐ BANNER
//     banner: { type: String, default: "" },
//     bannerPublicId: { type: String, default: "" },

//     bannerZoom: { type: Number, default: 1 },
//     bannerX: { type: Number, default: 0 },
//     bannerY: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Festival", FestivalSchema);

const mongoose = require("mongoose");

const FestivalSchema = new mongoose.Schema(
  {
    /* ================= BASIC ================= */
    title: { type: String, required: true },
    template: { type: String, default: "" },

    /* ================= STATUS ================= */
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    /* ================= TIMELINE ================= */
    startAt: {
      type: Date,
      default: Date.now,
    },
    expireAt: {
      type: Date,
      required: true,
    },

    /* ================= LOGO / PROFILE ================= */
    logo: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },

    logoType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    zoom: { type: Number, default: 1 },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },

    /* ================= PROFILE SETTINGS ================= */
    profile: {
      size: {
        type: Number, // px
        default: 120,
      },
      shape: {
        type: String,
        enum: ["circle", "square", "rounded"],
        default: "circle",
      },
      position: {
        type: String,
        enum: [
          "topLeft",
          "topCenter",
          "topRight",
          "centerLeft",
          "center",
          "centerRight",
          "bottomLeft",
          "bottomCenter",
          "bottomRight",
        ],
        default: "center",
      },
    },

    /* ================= PROFILE ANIMATION ================= */
    animation: {
      profile: {
        effect: {
          type: String,
          enum: [
            "none",
            "fadeIn",
            "slideUp",
            "slideDown",
            "slideLeft",
            "slideRight",
            "zoomIn",
            "rotateIn",
            "bounce",
            "pulse",
          ],
          default: "fadeIn",
        },
        duration: {
          type: Number, // seconds
          default: 0.8,
        },
        delay: {
          type: Number, // seconds
          default: 0,
        },
        easing: {
          type: String,
          default: "ease",
        },
      },
    },

    /* ================= TRANSITION (PAGE / TEMPLATE) ================= */
    transition: {
      type: {
        type: String,
        enum: [
          "none",
          "fade",
          "slideFromTop",
          "slideFromBottom",
          "slideFromLeft",
          "slideFromRight",
          "zoomIn",
        ],
        default: "fade",
      },
      duration: {
        type: Number, // seconds
        default: 0.8,
      },
      delay: {
        type: Number,
        default: 0,
      },
      easing: {
        type: String,
        default: "ease",
      },
    },

    /* ================= BANNER ================= */
    banner: { type: String, default: "" },
    bannerPublicId: { type: String, default: "" },

    bannerZoom: { type: Number, default: 1 },
    bannerX: { type: Number, default: 0 },
    bannerY: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Festival", FestivalSchema);
