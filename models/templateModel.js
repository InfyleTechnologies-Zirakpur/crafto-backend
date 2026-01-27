

// // // const mongoose = require("mongoose");

// // // const TemplateSchema = new mongoose.Schema(
// // //   {
// // //     title: { type: String, required: true },
// // //     type: { type: String, enum: ["video", "graphics"], default: "video" },
// // //     status: { type: String, enum: ["active", "inactive"], default: "active" },

// // //     // Parent refs
// // //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
// // //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
// // //     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

// // //     // files (Cloudinary URLs)
// // //     file: { type: String, default: null },
// // //     filePublicId: { type: String, default: null },
// // //     frameFile: { type: String, default: null },
// // //     frameFilePublicId: { type: String, default: null },

// // //     // UI related fields
// // //     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },
// // //     transitionType: {
// // //       type: String,
// // //       enum: [
// // //         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// // //         "scale","rotation","bounce","ripple","profileReveal"
// // //       ],
// // //       default: "fade"
// // //     },
// // //     profilePosition: {
// // //       type: String,
// // //       enum: [
// // //         "topLeft","topRight","bottomLeft","bottomRight","center",
// // //         "centerLeft","centerRight","topCenter","bottomCenter"
// // //       ],
// // //       default: "center"
// // //     },
// // //     orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },
// // //     profileSize: { type: String, default: "" }, // like "300x300"
// // //     profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },

// // //   },
// // //   { timestamps: true }
// // // );

// // // module.exports = mongoose.model("Template", TemplateSchema);

// // const mongoose = require("mongoose");

// // const TemplateSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     type: { type: String, enum: ["video", "graphics"], default: "video" },
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },

// //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
// //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
// //     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

// //     file: { type: String, default: null },
// //     filePublicId: { type: String, default: null },

// //     frameFile: { type: String, default: null },
// //     frameFilePublicId: { type: String, default: null },

// //     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

// //     transitionType: {
// //       type: String,
// //       enum: [
// //         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// //         "scale","rotation","bounce","ripple","profileReveal"
// //       ],
// //       default: "fade"
// //     },

// //     profilePosition: {
// //       type: String,
// //       enum: [
// //         "topLeft","topRight","bottomLeft","bottomRight","center",
// //         "centerLeft","centerRight","topCenter","bottomCenter"
// //       ],
// //       default: "center"
// //     },

// //     orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },

// //     profileSize: { type: String, default: "" },
// //     profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Template", TemplateSchema);


// // const mongoose = require("mongoose");
// // const TemplateSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     type: { type: String, enum: ["video", "graphics"], default: "video" },
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },

// //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
// //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
// //     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

// //     file: { type: String, default: null },
// //     filePublicId: { type: String, default: null },

// //     frameFile: { type: String, default: null },
// //     frameFilePublicId: { type: String, default: null },

// //     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

// //     transitionType: {
// //       type: String,
// //       enum: [
// //         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// //         "scale","rotation","bounce","ripple","profileReveal"
// //       ],
// //       default: "fade"
// //     },

// //     profilePosition: {
// //       type: String,
// //       enum: [
// //         "topLeft","topRight","bottomLeft","bottomRight","center",
// //         "centerLeft","centerRight","topCenter","bottomCenter"
// //       ],
// //       default: "center"
// //     },

// //     orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },

// //     profileSize: { type: String, default: "" },
// //     profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Template", TemplateSchema);




// const mongoose = require("mongoose");

// const TemplateSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     contentOwnerName: { type: String, default: "" },
//     type: { type: String, enum: ["video", "graphics"], default: "video" },
//     status: { type: String, enum: ["active", "inactive"], default: "active" },

//     // ========== Parent Linking (MULTIPLE OPTIONS) ==========
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
//     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
//     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

//     birthday: { type: mongoose.Schema.Types.ObjectId, ref: "Birthday", default: null },
//     anniversary: { type: mongoose.Schema.Types.ObjectId, ref: "Anniversary", default: null },
//     festival: { type: mongoose.Schema.Types.ObjectId, ref: "Festival", default: null },

//     // ========== Template Files ==========
//     file: { type: String, default: null },
//     filePublicId: { type: String, default: null },

//     frameFile: { type: String, default: null },
//     frameFilePublicId: { type: String, default: null },

//     // ========== Transitions ==========
//     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

//     transitionType: {
//       type: String,
//       enum: [
//         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//         "scale","rotation","bounce","ripple","profileReveal"
//       ],
//       default: "fade"
//     },

//     profilePosition: {
//       type: String,
//       enum: [
//         "topLeft","topRight","bottomLeft","bottomRight","center",
//         "centerLeft","centerRight","topCenter","bottomCenter"
//       ],
//       default: "center"
//     },

//     orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },

//     profileSize: { type: String, default: "" },
//     profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Template", TemplateSchema);




// const mongoose = require("mongoose");

// const TemplateSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     type: { type: String, enum: ["video", "graphics"], default: "video" },
//     status: { type: String, enum: ["active", "inactive"], default: "active" },

//     // ========== Parent Linking (MULTIPLE OPTIONS) ==========
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
//     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
//     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

//     birthday: { type: mongoose.Schema.Types.ObjectId, ref: "Birthday", default: null },
//     anniversary: { type: mongoose.Schema.Types.ObjectId, ref: "Anniversary", default: null },
//     festival: { type: mongoose.Schema.Types.ObjectId, ref: "Festival", default: null },

//     // ========== Template Files ==========
//     file: { type: String, default: null },
//     filePublicId: { type: String, default: null },

//     frameFile: { type: String, default: null },
//     frameFilePublicId: { type: String, default: null },

//     // ========== Transitions ==========
//     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

//     transitionType: {
//       type: String,
//       enum: [
//         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//         "scale","rotation","bounce","ripple","profileReveal"
//       ],
//       default: "fade"
//     },

//     profilePosition: {
//       type: String,
//       enum: [
//         "topLeft","topRight","bottomLeft","bottomRight","center",
//         "centerLeft","centerRight","topCenter","bottomCenter"
//       ],
//       default: "center"
//     },

//     orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },

//     profileSize: { type: String, default: "" },
//     profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Template", TemplateSchema);

const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["video", "graphics"],
      default: "video",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // ================= PARENT LINKING =================
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    politician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Politician",
      default: null,
    },

    religious: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Religious",
      default: null,
    },

    birthday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Birthday",
      default: null,
    },

    anniversary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anniversary",
      default: null,
    },

    festival: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Festival",
      default: null,
    },

    // ================= FILES =================
    file: { type: String, default: null },
    filePublicId: { type: String, default: null },

    frameFile: { type: String, default: null },
    frameFilePublicId: { type: String, default: null },

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
        type: Number, // seconds
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
          default: "none",
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
          default: "none",
        },

        delay: {
          type: Number,
          default: 0,
        },

        duration: {
          type: Number,
          default: 0.5,
        },
      },
    },

    // ================= PROFILE SETTINGS =================
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
        default: "120px",
      },

      shape: {
        type: String,
        enum: ["circle", "square", "rectangle"],
        default: "circle",
      },
    },

    // ================= POSITION & SCALE CONTROLS =================
    // (Used for LIVE PREVIEW + FINAL RENDER)
    fileZoom: {
      type: Number,
      default: 1,
    },

    fileX: {
      type: Number,
      default: 0,
    },

    fileY: {
      type: Number,
      default: 0,
    },

    frameZoom: {
      type: Number,
      default: 1,
    },

    frameX: {
      type: Number,
      default: 0,
    },

    frameY: {
      type: Number,
      default: 0,
    },

    // ================= VIDEO ORIENTATION =================
    orientation: {
      type: String,
      enum: ["landscape", "portrait"],
      default: "landscape",
    },
    // ================= SOURCE MY CREATION =================
sourceCreation: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "MyCreation",
  default: null,
},

  },
  
  { timestamps: true }
  
);


module.exports = mongoose.model("Template", TemplateSchema);
