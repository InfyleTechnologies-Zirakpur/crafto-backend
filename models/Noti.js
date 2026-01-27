// // const mongoose = require("mongoose");

// // const notiSchema = new mongoose.Schema(
// //   {
// //     title: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     body: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     image: {
// //       type: String,
// //       default: "",
// //     },

// //     link: {
// //       type: String,
// //       default: "",
// //     },

// //     sent: {
// //       type: Boolean,
// //       default: false,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // /* =====================================================
// //    🔥 SAFE MODEL EXPORT (OverwriteModelError FIX)
// // ===================================================== */
// // module.exports =
// //   mongoose.models.Noti || mongoose.model("Noti", notiSchema);

// const mongoose = require("mongoose");

// const NotificationSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     body: { type: String, required: true },
//     image: { type: String, default: "" },
//     link: { type: String, default: "" },
//     sent: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.Noti || mongoose.model("Noti", NotificationSchema);
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    sent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Noti || mongoose.model("Noti", NotificationSchema);
