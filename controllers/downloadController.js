// // const Download = require("../models/Download");

// // // ✅ POST - Add a download record
// // exports.addDownload = async (req, res) => {
// //   try {
// //     const { userId } = req.body;
// //     const newData = await Download.create({ userId, ...req.body });

// //     res.status(201).json({
// //       success: true,
// //       data: newData,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ✅ GET - Get all downloads
// // exports.getDownloads = async (req, res) => {
// //   try {
// //     const downloads = await Download.find().sort({ createdAt: -1 });
// //     res.status(200).json({
// //       success: true,
// //       count: downloads.length,
// //       data: downloads,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ✅ DELETE - Delete a download by ID
// // exports.deleteDownload = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const deleted = await Download.findByIdAndDelete(id);
// //     if (!deleted) {
// //       return res.status(404).json({ success: false, message: "Download not found" });
// //     }
// //     res.status(200).json({ success: true, message: "Download deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// const Download = require("../models/Download");

// /* =====================================================
//    👤 ADD DOWNLOAD (Logged-in User)
//    POST /api/downloads
// ===================================================== */
// exports.addDownload = async (req, res) => {
//   try {
//     // 🔐 user JWT se aayega (body se nahi)
//     const userId = req.user._id;

//     const download = await Download.create({
//       user: userId,          // ✅ secure
//       ...req.body,           // templateId, file, etc
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Download added successfully",
//       data: download,
//     });
//   } catch (error) {
//     console.error("❌ Add Download Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* =====================================================
//    👤 GET MY DOWNLOADS (Logged-in User)
//    GET /api/downloads/my
// ===================================================== */
// // exports.getMyDownloads = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     const downloads = await Download.find({ user: userId })
// //       .sort({ createdAt: -1 });

// //     return res.status(200).json({
// //       success: true,
// //       count: downloads.length,
// //       data: downloads,
// //     });
// //   } catch (error) {
// //     console.error("❌ Get My Downloads Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };
// exports.getMyDownloads = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const downloads = await Download.find({ user: userId })
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: downloads.length,
//       data: downloads,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// /* =====================================================
//    👑 GET ALL DOWNLOADS (Admin)
//    GET /api/downloads
// ===================================================== */
// exports.getDownloads = async (req, res) => {
//   try {
//     const downloads = await Download.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: downloads.length,
//       data: downloads,
//     });
//   } catch (error) {
//     console.error("❌ Get Downloads Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* =====================================================
//    👑 DELETE DOWNLOAD (Admin)
//    DELETE /api/downloads/:id
// ===================================================== */
// exports.deleteDownload = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await Download.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Download not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Download deleted successfully",
//     });
//   } catch (error) {
//     console.error("❌ Delete Download Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const Download = require("../models/Download");

/* =====================================================
   👤 ADD DOWNLOAD (Logged-in User)
   POST /api/downloads
===================================================== */
exports.addDownload = async (req, res) => {
  try {
    // 🔐 Logged-in user (JWT se)
    const userId = req.user._id;

    // 🛡️ Body se userId hata do (security)
    const { userId: bodyUserId, ...rest } = req.body;

    const download = await Download.create({
      userId: userId,   // ✅ schema ke exact match
      ...rest,
    });

    return res.status(201).json({
      success: true,
      message: "Download added successfully",
      data: download,
    });
  } catch (error) {
    console.error("❌ Add Download Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   👤 GET MY DOWNLOADS (Logged-in User)
   GET /api/downloads/my
===================================================== */
exports.getMyDownloads = async (req, res) => {
  try {
    const userId = req.user._id;

    const downloads = await Download.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    console.error("❌ Get My Downloads Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   👑 GET ALL DOWNLOADS (Admin)
   GET /api/downloads
===================================================== */
exports.getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find()
      .populate("userId", "name email") // ✅ correct populate
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    console.error("❌ Get Downloads Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   👑 DELETE DOWNLOAD (Admin)
   DELETE /api/downloads/:id
===================================================== */
exports.deleteDownload = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Download.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Download deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Download Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
