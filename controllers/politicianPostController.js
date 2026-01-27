// const PoliticianPost = require("../models/PoliticianPost");
// const Politician = require("../models/politicianModel");

// /* =====================================================
//    CREATE POLITICIAN POST (IMAGE / VIDEO SUPPORTED)
// ===================================================== */
// exports.createPoliticianPost = async (req, res) => {
//   try {
//     const { politician, title, description = "" } = req.body;

//     // 🔒 Basic validation
//     if (!politician || !title) {
//       return res.status(400).json({
//         success: false,
//         message: "Politician and title are required",
//       });
//     }

//     // 🔒 Check politician exists
//     const pol = await Politician.findById(politician).select("title");
//     if (!pol) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid politician selected",
//       });
//     }

//     // ================= MEDIA HANDLE =================
//     let mediaUrl = "";
//     let mediaType = "";

//     // multer + cloudinary se file aayegi
//     if (req.file) {
//       mediaUrl = req.file.path || req.file.secure_url;

//       mediaType = req.file.mimetype.startsWith("video")
//         ? "video"
//         : "image";
//     }

//     // ================= CREATE POST =================
//     const post = await PoliticianPost.create({
//       politician,
//       title: title.trim(),
//       description,
//       media: mediaUrl,
//       mediaType,               // image | video
//       createdBy: req.user._id, // admin / user
//       status: "active",
//     });

//     return res.status(201).json({
//       success: true,
//       post,
//     });
//   } catch (err) {
//     console.error("❌ CREATE POLITICIAN POST ERROR:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create politician post",
//     });
//   }
// };

// /* =====================================================
//    GET POSTS BY POLITICIAN (PUBLIC)
// ===================================================== */
// exports.getPostsByPolitician = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const posts = await PoliticianPost.find({
//       politician: id,
//       status: "active",
//     })
//       .populate("politician", "title logo")
//       .populate("createdBy", "name")
//       .sort({ createdAt: -1 });

//     return res.json({
//       success: true,
//       count: posts.length,
//       posts,
//     });
//   } catch (err) {
//     console.error("❌ GET POSTS ERROR:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch politician posts",
//     });
//   }
// };
// /* =====================================================
//    GET ALL POLITICIAN POSTS (ADMIN)
// ===================================================== */
// exports.getAllPoliticianPosts = async (req, res) => {
//   try {
//     const posts = await PoliticianPost.find({ status: "active" })
//       .populate("politician", "title")
//       .populate("createdBy", "name")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: posts.length,
//       posts,
//     });
//   } catch (err) {
//     console.error("❌ GET ALL POSTS ERROR:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch politician posts",
//     });
//   }
// };

const PoliticianPost = require("../models/PoliticianPost");
const Politician = require("../models/politicianModel");
const cloudinary = require("../config/cloudinary");

/* =====================================================
   CREATE POLITICIAN POST (IMAGE / VIDEO)
===================================================== */
exports.createPoliticianPost = async (req, res) => {
  try {
    const { politician, title, description = "" } = req.body;

    if (!politician || !title) {
      return res.status(400).json({
        success: false,
        message: "Politician and title are required",
      });
    }

    const pol = await Politician.findById(politician).select("title");
    if (!pol) {
      return res.status(400).json({
        success: false,
        message: "Invalid politician selected",
      });
    }

    let mediaUrl = "";
    let mediaType = "";

    if (req.file) {
      mediaUrl = req.file.path || req.file.secure_url;
      mediaType = req.file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    const post = await PoliticianPost.create({
      politician,
      title: title.trim(),
      description,
      media: mediaUrl,
      mediaType,
      createdBy: req.user._id,
      status: "active",
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    console.error("❌ CREATE POST ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create politician post",
    });
  }
};

/* =====================================================
   GET ALL POLITICIAN POSTS (ADMIN)
===================================================== */
exports.getAllPoliticianPosts = async (req, res) => {
  try {
    const posts = await PoliticianPost.find({ status: "active" })
      .populate("politician", "title")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error("❌ GET ALL POSTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch politician posts",
    });
  }
};

/* =====================================================
   GET POSTS BY POLITICIAN (PUBLIC)
===================================================== */
exports.getPostsByPolitician = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await PoliticianPost.find({
      politician: id,
      status: "active",
    })
      .populate("politician", "title logo")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error("❌ GET POSTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch politician posts",
    });
  }
};

/* =====================================================
   UPDATE POLITICIAN POST
===================================================== */
exports.updatePoliticianPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const post = await PoliticianPost.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // 🔁 Replace media if new uploaded
    if (req.file) {
      // delete old media from cloudinary
      if (post.media) {
        const publicId = post.media.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId, {
          resource_type: post.mediaType === "video" ? "video" : "image",
        });
      }

      post.media = req.file.path || req.file.secure_url;
      post.mediaType = req.file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    post.title = title ?? post.title;
    post.description = description ?? post.description;
    post.status = status ?? post.status;

    await post.save();

    res.json({
      success: true,
      post,
    });
  } catch (err) {
    console.error("❌ UPDATE POST ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};

/* =====================================================
   DELETE POLITICIAN POST
===================================================== */
exports.deletePoliticianPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PoliticianPost.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // 🔥 delete media from cloudinary
    if (post.media) {
      const publicId = post.media.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId, {
        resource_type: post.mediaType === "video" ? "video" : "image",
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error("❌ DELETE POST ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};
