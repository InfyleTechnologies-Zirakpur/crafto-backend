const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * IMPORTANT RULES:
 * 1. Sirf EK jagah Google verify hona chahiye
 * 2. OAuth2Client ko GOOGLE_CLIENT_ID ke saath init karo
 * 3. verifyIdToken me audience pass karo
 * 4. Frontend se ONLY idToken (credential) aana chahiye
 */
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Normalize email (duplicate users avoid karne ke liye)
 */
const normalizeEmail = (email) =>
  String(email || "").toLowerCase().trim();

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // 1️⃣ Token check
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token missing",
      });
    }

    // 2️⃣ Verify Google ID Token (OFFICIAL & CORRECT WAY)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google email not found",
      });
    }

    const cleanEmail = normalizeEmail(email);

    // 3️⃣ Find user
    let user = await User.findOne({ email: cleanEmail });

    // 4️⃣ Create new user if not exists
    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email: cleanEmail,
        googleId: sub,
        role: "user",
        status: "active",
        avatar: {
          url: picture,
          provider: "google",
        },
      });
    }

    // 5️⃣ Link Google if email user exists
    if (user && !user.googleId) {
      user.googleId = sub;
      user.avatar = {
        url: picture,
        provider: "google",
      };
      await user.save();
    }

    // 6️⃣ Create JWT (YOUR app token)
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

    return res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });

  } catch (error) {
    console.error("Google Login Error:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
