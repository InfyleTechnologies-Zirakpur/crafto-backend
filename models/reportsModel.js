// // models/reportsModel.js
// const mongoose = require("mongoose");

// const ReportsSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Reports", ReportsSchema);


// const mongoose = require("mongoose");

// const ReportsSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Reports", ReportsSchema);


const mongoose = require("mongoose");

const ReportsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 REPORTED TEMPLATE ID
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",   // 👈 templateModel.js ka model name
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reports", ReportsSchema);
