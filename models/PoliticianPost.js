const mongoose = require("mongoose");

const PoliticianPostSchema = new mongoose.Schema(
  {
    politician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Politician",
      required: true,
    },

    politicianName: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    media: {
      type: String, // image / video URL (cloudinary)
      default: "",
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PoliticianPost", PoliticianPostSchema);
