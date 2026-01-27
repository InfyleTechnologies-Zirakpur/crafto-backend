const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin = require("../config/firebase");

const User = require("../models/User");
const DeviceToken = require("../models/DeviceToken");

const router = express.Router();

/* =====================================================
   JWT TOKEN
===================================================== */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* =====================================================
   EMAIL NORMALIZER
===================================================== */
const normalizeEmail = (email) =>
  String(email || "").toLowerCase().trim();

/* =====================================================
   USER SIGNUP
===================================================== */
router.post("/user/create", async (req, res) => {
  try {
    let { name, email, password, fcmToken } = req.body;

    email = normalizeEmail(email);
    password = String(password || "").trim();
    name = name ? name.trim() : "New User";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      status: "active",
    });

    if (fcmToken && fcmToken.length > 20) {
      await DeviceToken.findOneAndUpdate(
        { token: fcmToken },
        { token: fcmToken, user: user._id },
        { upsert: true }
      );
    }

    return res.status(201).json({
      success: true,
      token: generateToken(user),
      user,
    });
  } catch (err) {
    console.error("USER SIGNUP ERROR:", err.message);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

/* =====================================================
   USER LOGIN
===================================================== */
router.post("/user/log", async (req, res) => {
  try {
    let { email, password, fcmToken } = req.body;

    email = normalizeEmail(email);
    password = String(password || "").trim();

    const user = await User.findOne({
      email,
      role: "user",
      status: "active",
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (fcmToken && fcmToken.length > 20) {
      await DeviceToken.findOneAndUpdate(
        { token: fcmToken },
        { token: fcmToken, user: user._id },
        { upsert: true }
      );
    }

    return res.json({
      success: true,
      token: generateToken(user),
      user,
    });
  } catch (err) {
    console.error("USER LOGIN ERROR:", err.message);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

/* =====================================================
   🔥 FIREBASE GOOGLE LOGIN
===================================================== */
router.post("/google", async (req, res) => {
  try {
    const { token, fcmToken } = req.body;

    console.log("\n========== GOOGLE LOGIN DEBUG ==========");
    console.log("1. Token received:", !!token);
    console.log("2. Token length:", token?.length);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token required",
      });
    }

    // Decode token to check details
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        console.log("3. Token project (aud):", payload.aud);
        console.log("4. Token expires at:", new Date(payload.exp * 1000));
        console.log("5. Token expired?", Date.now() > payload.exp * 1000);
        
        const serviceAccount = require("../firebaseServiceAccount.json");
        console.log("6. Service account project:", serviceAccount.project_id);
        console.log("7. Projects match?", payload.aud === serviceAccount.project_id);
      }
    } catch (decodeErr) {
      console.log("Token decode error:", decodeErr.message);
    }

    console.log("8. Attempting Firebase verification...");

    // 🔐 VERIFY FIREBASE ID TOKEN
    const decodedToken = await admin.auth().verifyIdToken(token);

    console.log("✅ Token verified successfully!");
    console.log("User UID:", decodedToken.uid);
    console.log("User email:", decodedToken.email);
    console.log("========================================\n");

    const { uid, email, name, picture } = decodedToken;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not found in Firebase token",
      });
    }

    const cleanEmail = normalizeEmail(email);

    let user = await User.findOne({ email: cleanEmail });

    if (!user) {
      console.log("📝 Creating new user in database...");
      user = await User.create({
        name: name || "Google User",
        email: cleanEmail,
        firebaseUid: uid,
        role: "user",
        status: "active",
        avatar: {
          url: picture,
          provider: "firebase",
        },
      });
      console.log("✅ New user created:", user._id);
    } else {
      console.log("👋 Existing user found:", user._id);
    }

    if (fcmToken && fcmToken.length > 20) {
      await DeviceToken.findOneAndUpdate(
        { token: fcmToken },
        { token: fcmToken, user: user._id },
        { upsert: true }
      );
    }

    const appToken = generateToken(user);

    return res.json({
      success: true,
      token: appToken,
      user,
    });
  } catch (err) {
    console.error("\n❌ FIREBASE VERIFICATION ERROR:");
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    console.error("========================================\n");

    return res.status(401).json({
      success: false,
      message: err.message,
      errorCode: err.code,
    });
  }
});

/* =====================================================
   ADMIN LOGIN
===================================================== */
router.post("/admin/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = normalizeEmail(email);
    password = String(password || "").trim();

    const adminUser = await User.findOne({
      email,
      role: "admin",
      status: "active",
    }).select("+password");

    if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    return res.json({
      success: true,
      token: generateToken(adminUser),
      admin: adminUser,
    });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err.message);
    return res.status(500).json({
      success: false,
      message: "Admin login failed",
    });
  }
});

module.exports = router;