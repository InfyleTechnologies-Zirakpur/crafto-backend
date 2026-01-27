const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    bannerUrl: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
