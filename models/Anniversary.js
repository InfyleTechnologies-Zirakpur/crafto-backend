
// const mongoose = require('mongoose');

// const AnniversarySchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   name: { type: String, required: true },
//   date: { type: String, required: true },
//   status: { type: String, enum: ['active','inactive'], default: 'active' },

//   media: { type: String, default: '' },        // 🔥 image OR video URL
//   mediaType: { type: String, enum: ['image','video'], default: 'image' },
//   mediaPublicId: { type: String, default: '' },

//   banner: { type: String, default: '' },
//   bannerPublicId: { type: String, default: '' },

//   zoom: { type: Number, default: 1 },
//   offsetX: { type: Number, default: 0 },
//   offsetY: { type: Number, default: 0 },

//   bannerZoom: { type: Number, default: 1 },
//   bannerX: { type: Number, default: 0 },
//   bannerY: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model('Anniversary', AnniversarySchema);

const mongoose = require("mongoose");

const AnniversarySchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // ================= MEDIA FILE =================
    media: {
      type: String,
      default: "",
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    mediaPublicId: {
      type: String,
      default: "",
    },

    // ================= BANNER FILE =================
    banner: {
      type: String,
      default: "",
    },

    bannerPublicId: {
      type: String,
      default: "",
    },

    // ================= TRANSITION SETTINGS =================
    transition: {
      placement: {
        type: String,
        enum: ["above", "below"],
        default: "below",
      },

      type: {
        type: String,
        enum: [
          "fade",
          "slideFromBottom",
          "slideFromTop",
          "slideFromLeft",
          "slideFromRight",
          "zoomIn",
          "zoomOut",
          "rotate",
          "flip",
          "blur",
          "wipe",
        ],
        default: "fade",
      },

      duration: {
        type: Number,
        default: 0.8,
      },
    },

    // ================= ANIMATION SETTINGS =================
    animation: {
      profile: {
        effect: {
          type: String,
          enum: [
            "none",
            "popIn",
            "bounce",
            "scaleUp",
            "rotateIn",
            "slideUp",
            "fadeIn",
            "profileReveal",
          ],
          default: "fadeIn",
        },

        delay: {
          type: Number,
          default: 0,
        },

        duration: {
          type: Number,
          default: 0.6,
        },
      },

      text: {
        effect: {
          type: String,
          enum: [
            "none",
            "fadeIn",
            "slideUp",
            "slideLeft",
            "slideRight",
            "typing",
            "bounce",
          ],
          default: "fadeIn",
        },

        delay: {
          type: Number,
          default: 0.2,
        },

        duration: {
          type: Number,
          default: 0.5,
        },
      },
    },

    // ================= PROFILE IMAGE SETTINGS =================
    profile: {
      position: {
        type: String,
        enum: [
          "topLeft",
          "topRight",
          "bottomLeft",
          "bottomRight",
          "center",
          "centerLeft",
          "centerRight",
          "topCenter",
          "bottomCenter",
        ],
        default: "center",
      },

      size: {
        type: String,
        default: "140px",
      },

      shape: {
        type: String,
        enum: ["circle", "square", "rounded", "heart"],
        default: "circle",
      },
    },

    // ================= PROFILE TRANSFORM =================
    profileZoom: {
      type: Number,
      default: 1,
    },

    profileX: {
      type: Number,
      default: 0,
    },

    profileY: {
      type: Number,
      default: 0,
    },

    profileRotate: {
      type: Number,
      default: 0,
    },

    // ================= BANNER TRANSFORM =================
    bannerZoom: {
      type: Number,
      default: 1,
    },

    bannerX: {
      type: Number,
      default: 0,
    },

    bannerY: {
      type: Number,
      default: 0,
    },

    // ================= ORIENTATION =================
    orientation: {
      type: String,
      enum: ["landscape", "portrait"],
      default: "portrait",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anniversary", AnniversarySchema);
