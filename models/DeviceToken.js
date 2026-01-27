// // // const mongoose = require("mongoose");

// // // const deviceTokenSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //     },
// // //     token: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //     },
// // //     platform: {
// // //       type: String,
// // //       default: "android",
// // //     },
// // //   },
// // //   { timestamps: true }
// // // );

// // // module.exports =
// // //   mongoose.models.DeviceToken ||
// // //   mongoose.model("DeviceToken", deviceTokenSchema);

// // const mongoose = require("mongoose");

// // const deviceTokenSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     token: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //     },
// //     platform: {
// //       type: String,
// //       default: "web",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports =
// //   mongoose.models.DeviceToken ||
// //   mongoose.model("DeviceToken", deviceTokenSchema);

// // const mongoose = require("mongoose");

// // const deviceTokenSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: false, // ✅ login se pehle bhi token save ho sake
// //     },

// //     token: {
// //       type: String,
// //       required: true,
// //       unique: true, // ✅ same device duplicate na ho
// //       index: true,
// //     },

// //     platform: {
// //       type: String,
// //       enum: ["android", "ios", "web"],
// //       default: "android", // ✅ APP ke liye default
// //     },

// //     deviceId: {
// //       type: String, // optional (Android ID / iOS identifier)
// //       default: "",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports =
// //   mongoose.models.DeviceToken ||
// //   mongoose.model("DeviceToken", deviceTokenSchema);


// const mongoose = require("mongoose");

// const deviceTokenSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: false, // ✅ login ke baad link ho jayega
//       index: true,
//     },

//     token: {
//       type: String,
//       required: true,
//       unique: true, // ✅ same device ka token duplicate nahi hoga
//       index: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.DeviceToken ||
//   mongoose.model("DeviceToken", deviceTokenSchema);

const mongoose = require("mongoose");

const deviceTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    platform: {
      type: String,
      enum: ["android", "ios", "web"],
      default: "android",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.DeviceToken ||
  mongoose.model("DeviceToken", deviceTokenSchema);
