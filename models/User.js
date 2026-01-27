const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: {
      type: String,
      default: "New User",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    /* ================= AUTH ================= */
    // 🔐 Email login
    password: {
      type: String,
      select: false,
    },

    // 🔵 Google login
    googleId: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    /* ================= AVATAR ================= */
    avatar: {
      url: {
        type: String,
        default: "", // full image URL
      },
      publicId: {
        type: String,
        default: "", // cloudinary public_id
      },
      provider: {
        type: String,
        enum: ["local", "google", "cloudinary"],
        default: "local",
      },
    },

    /* ================= SUBSCRIPTION ================= */
    premium: {
      type: Boolean,
      default: false,
    },

    /* ================= USER STATS ================= */
    stats: {
      createdCount: {
        type: Number,
        default: 0,
      },
      sharedCount: {
        type: Number,
        default: 0,
      },
      downloadCount: {
        type: Number,
        default: 0,
      },
      savedTemplates: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

/* =====================================================
   🔐 Hash password (Email users only)
===================================================== */
userSchema.pre("save", async function (next) {
  if (!this.password) return next(); // Google users safety
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* =====================================================
   🔑 Compare password
===================================================== */
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);