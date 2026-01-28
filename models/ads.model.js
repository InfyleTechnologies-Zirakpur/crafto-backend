
const mongoose = require("mongoose");

const AdsSchema = new mongoose.Schema(
  {
    // ================= QUOTE =================
    quote: {
      type: String,
      required: true,
      trim: true,
    },

    // ================= MEDIA =================
    mediaUrl: {
      type: String,
      default: "",
    },

    mediaType: {
      type: String, // image | video
      default: "",
    },

    publicId: {
      type: String, // Cloudinary public_id
      default: "",
    },

    // ================= PRICE =================
    price: {
      type: Number, // Base price
      required: true,
      default: 2,
    },

    // ================= GST (SAME AS SUBSCRIPTION) =================
    gstPercent: {
      type: Number,
      default: 0, // ex: 18
    },

    gstAmount: {
      type: Number,
      default: 0, // calculated
    },

    finalAmount: {
      type: Number,
      default: 0, // price + gstAmount
    },

    // ================= CTA =================
    ctaText: {
      type: String,
      default: "अपने फोटो के साथ शेयर/डाउनलोड करें",
    },

    // ================= STATUS =================
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ads", AdsSchema);
