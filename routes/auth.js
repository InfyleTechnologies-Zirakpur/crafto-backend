// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const admin = require("../config/firebase");
// const https = require("https");

// const User = require("../models/User");
// const DeviceToken = require("../models/DeviceToken");

// const router = express.Router();

// /* =====================================================
//    JWT TOKEN
// ===================================================== */
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );
// };

// /* =====================================================
//    EMAIL NORMALIZER
// ===================================================== */
// const normalizeEmail = (email) =>
//   String(email || "").toLowerCase().trim();

// /* =====================================================
//    USER SIGNUP
// ===================================================== */
// router.post("/user/create", async (req, res) => {
//   try {
//     let { name, email, password, fcmToken } = req.body;

//     email = normalizeEmail(email);
//     password = String(password || "").trim();
//     name = name ? name.trim() : "New User";

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password required",
//       });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: "user",
//       status: "active",
//     });

//     if (fcmToken && fcmToken.length > 20) {
//       await DeviceToken.findOneAndUpdate(
//         { token: fcmToken },
//         { token: fcmToken, user: user._id },
//         { upsert: true }
//       );
//     }

//     return res.status(201).json({
//       success: true,
//       token: generateToken(user),
//       user,
//     });
//   } catch (err) {
//     console.error("USER SIGNUP ERROR:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Signup failed",
//     });
//   }
// });

// /* =====================================================
//    USER LOGIN
// ===================================================== */
// router.post("/user/log", async (req, res) => {
//   try {
//     let { email, password, fcmToken } = req.body;

//     email = normalizeEmail(email);
//     password = String(password || "").trim();

//     const user = await User.findOne({
//       email,
//       role: "user",
//       status: "active",
//     }).select("+password");

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     if (fcmToken && fcmToken.length > 20) {
//       await DeviceToken.findOneAndUpdate(
//         { token: fcmToken },
//         { token: fcmToken, user: user._id },
//         { upsert: true }
//       );
//     }

//     return res.json({
//       success: true,
//       token: generateToken(user),
//       user,
//     });
//   } catch (err) {
//     console.error("USER LOGIN ERROR:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Login failed",
//     });
//   }
// });

// /* =====================================================
//    🔥 FIREBASE GOOGLE LOGIN - WITH MANUAL VERIFICATION
// ===================================================== */
// router.post("/google", async (req, res) => {
//   try {
//     const { token, fcmToken } = req.body;

//     console.log("\n========== GOOGLE LOGIN ==========");
    
//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "Firebase ID token required",
//       });
//     }

//     console.log("Token received, length:", token.length);

//     // Decode without verification first
//     const parts = token.split('.');
//     if (parts.length !== 3) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid token format",
//       });
//     }

//     const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
//     console.log("Token for project:", payload.aud);
//     console.log("Token email:", payload.email);
//     console.log("Token UID:", payload.sub);

//     // Try verification with retries
//     let decodedToken;
//     let lastError;
    
//     for (let attempt = 1; attempt <= 3; attempt++) {
//       try {
//         console.log(`Attempt ${attempt}: Verifying token...`);
//         decodedToken = await admin.auth().verifyIdToken(token, false);
//         console.log("✅ Token verified successfully!");
//         break;
//       } catch (verifyError) {
//         lastError = verifyError;
//         console.log(`❌ Attempt ${attempt} failed:`, verifyError.code);
        
//         if (attempt < 3) {
//           // Wait before retry
//           await new Promise(resolve => setTimeout(resolve, 1000));
//         }
//       }
//     }

//     // If all attempts failed
//     if (!decodedToken) {
//       console.error("❌ All verification attempts failed:", lastError.code, lastError.message);
      
//       // Check if we can reach Google's servers
//       console.log("Testing network connectivity...");
      
//       return res.status(401).json({
//         success: false,
//         message: "Token verification failed after multiple attempts. This might be a network/firewall issue preventing the server from reaching Google's authentication servers.",
//         errorCode: lastError.code,
//         hint: "Check if your server can reach: https://www.googleapis.com",
//       });
//     }

//     const { uid, email, name, picture } = decodedToken;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email not found in token",
//       });
//     }

//     console.log("User authenticated:", email);

//     const cleanEmail = normalizeEmail(email);
//     let user = await User.findOne({ email: cleanEmail });

//     if (!user) {
//       console.log("Creating new user...");
//       user = await User.create({
//         name: name || "Google User",
//         email: cleanEmail,
//         firebaseUid: uid,
//         role: "user",
//         status: "active",
//         avatar: {
//           url: picture,
//           provider: "firebase",
//         },
//       });
//     } else {
//       console.log("User exists");
//       if (!user.firebaseUid) {
//         user.firebaseUid = uid;
//         await user.save();
//       }
//     }

//     if (fcmToken && fcmToken.length > 20) {
//       await DeviceToken.findOneAndUpdate(
//         { token: fcmToken },
//         { token: fcmToken, user: user._id },
//         { upsert: true }
//       );
//     }

//     const appToken = generateToken(user);

//     console.log("✅ Login successful");
//     console.log("==================================\n");

//     return res.json({
//       success: true,
//       token: appToken,
//       user,
//     });
//   } catch (err) {
//     console.error("\n❌ ERROR:", err.code, err.message);
//     console.error("==================================\n");

//     return res.status(401).json({
//       success: false,
//       message: err.message || "Authentication failed",
//       errorCode: err.code,
//     });
//   }
// });

// /* =====================================================
//    ADMIN LOGIN
// ===================================================== */
// router.post("/admin/login", async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     email = normalizeEmail(email);
//     password = String(password || "").trim();

//     const adminUser = await User.findOne({
//       email,
//       role: "admin",
//       status: "active",
//     }).select("+password");

//     if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid admin credentials",
//       });
//     }

//     return res.json({
//       success: true,
//       token: generateToken(adminUser),
//       admin: adminUser,
//     });
//   } catch (err) {
//     console.error("ADMIN LOGIN ERROR:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Admin login failed",
//     });
//   }
// });

// module.exports = router;


// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const admin = require("../config/firebase");

// const User = require("../models/User");
// const DeviceToken = require("../models/DeviceToken");

// const router = express.Router();

// /* =====================================================
//    JWT TOKEN
// ===================================================== */
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );
// };

// /* =====================================================
//    EMAIL NORMALIZER
// ===================================================== */
// const normalizeEmail = (email) =>
//   String(email || "").toLowerCase().trim();

// /* =====================================================
//    USER SIGNUP
// ===================================================== */
// router.post("/user/create", async (req, res) => {
//   try {
//     let { name, email, password, fcmToken } = req.body;

//     email = normalizeEmail(email);
//     password = String(password || "").trim();
//     name = name ? name.trim() : "New User";

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password required",
//       });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: "user",
//       status: "active",
//     });

//     if (fcmToken && fcmToken.length > 20) {
//       await DeviceToken.findOneAndUpdate(
//         { token: fcmToken },
//         { token: fcmToken, user: user._id },
//         { upsert: true }
//       );
//     }

//     return res.status(201).json({
//       success: true,
//       token: generateToken(user),
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Signup failed",
//     });
//   }
// });

// /* =====================================================
//    USER LOGIN
// ===================================================== */
// router.post("/user/log", async (req, res) => {
//   try {
//     let { email, password, fcmToken } = req.body;

//     email = normalizeEmail(email);
//     password = String(password || "").trim();

//     const user = await User.findOne({
//       email,
//       role: "user",
//       status: "active",
//     }).select("+password");

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     if (fcmToken && fcmToken.length > 20) {
//       await DeviceToken.findOneAndUpdate(
//         { token: fcmToken },
//         { token: fcmToken, user: user._id },
//         { upsert: true }
//       );
//     }

//     return res.json({
//       success: true,
//       token: generateToken(user),
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Login failed",
//     });
//   }
// });

// /* =====================================================
//    🔥 GOOGLE LOGIN (SIMPLIFIED & WORKING)
// ===================================================== */
// router.post("/google", async (req, res) => {
//   try {
//     const { token, fcmToken } = req.body;

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "Firebase token required",
//       });
//     }

//     // 🔹 Decode token payload (enough for login)
//     const parts = token.split(".");
//     if (parts.length !== 3) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid token format",
//       });
//     }

//     const payload = JSON.parse(
//       Buffer.from(parts[1], "base64").toString()
//     );

//     const email = payload.email;
//     const uid = payload.sub;
//     const name = payload.name;
//     const picture = payload.picture;

//     if (!email || !uid) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Google token data",
//       });
//     }

//     const cleanEmail = normalizeEmail(email);

//     // 🔹 Find or create user
//     let user = await User.findOne({ email: cleanEmail });

//     if (!user) {
//      user = await User.create({
//   name: name || "Google User",
//   email: cleanEmail,
//   googleId: uid,       // 👈 ADD THIS
//   role: "user",
//   status: "active",
//   avatar: {
//     url: picture,
//     provider: "google",
//   },
// });
//     }

//     // 🔹 Save FCM token if provided
//     if (fcmToken && fcmToken.length > 20) {
//       await DeviceToken.findOneAndUpdate(
//         { token: fcmToken },
//         { token: fcmToken, user: user._id },
//         { upsert: true }
//       );
//     }

//     // 🔹 BACKEND LOGIN (JWT)
//     const appToken = generateToken(user);

//     return res.json({
//       success: true,
//       token: appToken,
//       user,
//     });
//   } catch (err) {
//   console.error("GOOGLE LOGIN ERROR:", err);

//   return res.status(500).json({
//     success: false,
//     message: err.message,
//   });
// }

// });

// /* =====================================================
//    ADMIN LOGIN
// ===================================================== */
// router.post("/admin/login", async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     email = normalizeEmail(email);
//     password = String(password || "").trim();

//     const adminUser = await User.findOne({
//       email,
//       role: "admin",
//       status: "active",
//     }).select("+password");

//     if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid admin credentials",
//       });
//     }

//     return res.json({
//       success: true,
//       token: generateToken(adminUser),
//       admin: adminUser,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Admin login failed",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin = require("../config/firebase");

const User = require("../models/User");
const DeviceToken = require("../models/DeviceToken");

const router = express.Router();

/* =====================================================
   JWT
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
   USER SIGNUP (EMAIL + PASSWORD)
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
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

/* =====================================================
   USER LOGIN (EMAIL + PASSWORD)
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
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

/* =====================================================
   🔥 GOOGLE LOGIN (FIREBASE VERIFIED)
===================================================== */
router.post("/google", async (req, res) => {
  try {
    const { token, fcmToken } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token required",
      });
    }

    // 🔐 Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email, name, picture } = decoded;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account has no email",
      });
    }

    const cleanEmail = normalizeEmail(email);

    // 🔍 Find user
    let user = await User.findOne({ email: cleanEmail });

    // 🆕 Create if not exists
    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email: cleanEmail,
        googleId: uid,
        role: "user",
        status: "active",
        avatar: {
          url: picture || "",
          provider: "google",
        },
      });
    } else {
      // 🔄 Link Google if not linked
      if (!user.googleId) {
        user.googleId = uid;
        user.avatar.url = picture || user.avatar.url;
        user.avatar.provider = "google";
        await user.save();
      }
    }

    // 🔔 Save FCM token
    if (fcmToken && fcmToken.length > 20) {
      await DeviceToken.findOneAndUpdate(
        { token: fcmToken },
        { token: fcmToken, user: user._id },
        { upsert: true }
      );
    }

    // 🔑 Generate JWT
    const appToken = generateToken(user);

    return res.json({
      success: true,
      token: appToken,
      user,
    });
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired Google token",
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
    console.error("Admin login error:", err);
    return res.status(500).json({
      success: false,
      message: "Admin login failed",
    });
  }
});

module.exports = router;
