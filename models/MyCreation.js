// const mongoose = require("mongoose");

// const MyCreationSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     title: { type: String, required: true },
//     description: { type: String, default: "" },
//     type: { type: String, enum: ["video", "graphics"], default: "video" },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
//     orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },
//     profilePosition: {
//       type: String,
//       enum: [
//         "topLeft", "topRight", "bottomLeft", "bottomRight", "center",
//         "centerLeft", "centerRight", "topCenter", "bottomCenter"
//       ],
//       default: "center"
//     },
//     transitionType: {
//       type: String,
//       enum: [
//         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//         "scale","rotation","bounce","ripple","profileReveal"
//       ],
//       default: "fade"
//     },

//     // Files
//     file: { type: String, default: null },
//     filePublicId: { type: String, default: null },
//     frameFile: { type: String, default: null },
//     frameFilePublicId: { type: String, default: null },

//     // Approval fields
//     status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
//     adminComment: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("MyCreation", MyCreationSchema);

const mongoose = require("mongoose");

const MyCreationSchema = new mongoose.Schema(
  {
    // ================= USER =================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


contentOwnerName: {
  type: String,
  default: "",   // ✅ safe for old records
  trim: true,
},
    // ================= BASIC INFO =================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // ================= TYPE =================
    type: {
      type: String,
      enum: ["video", "graphics"],
      default: "video",
    },

    
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   default: null,
    // },

    category: {
  type: String,
  default: "",
  trim: true,
},

    // ================= ORIENTATION =================
    orientation: {
      type: String,
      enum: ["landscape", "portrait"],
      default: "landscape",
    },

    // ================= PROFILE POSITION =================
    profilePosition: {
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

    // ================= TRANSITION =================
    transitionType: {
      type: String,
      enum: [
        "fade",
        "slideFromBottom",
        "slideFromTop",
        "slideFromLeft",
        "slideFromRight",
        "scale",
        "rotation",
        "bounce",
        "ripple",
        "profileReveal",
      ],
      default: "fade",
    },

    // ================= MAIN FILE (VIDEO / IMAGE) =================
    file: {
      type: String, // Cloudinary URL
      default: null,
    },

    filePublicId: {
      type: String, // Cloudinary public_id
      default: null,
    },

    // ================= FRAME FILE =================
    frameFile: {
      type: String,
      default: null,
    },

    frameFilePublicId: {
      type: String,
      default: null,
    },

    // ================= ADMIN APPROVAL =================
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    adminComment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto
  }
);

module.exports = mongoose.model("MyCreation", MyCreationSchema);
