const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

/* =====================================================
   📌 GET POSTS
   - Last 24h posts → latest first
   - Older posts → random
===================================================== */
exports.getPosts = async (req, res) => {
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // 🟢 Recent posts (last 24 hours)
    const recentPosts = await Post.find({
      createdAt: { $gte: last24Hours },
      status: "active",
    }).sort({ createdAt: -1 });

    // 🔵 Older posts (random)
    const olderPosts = await Post.aggregate([
      {
        $match: {
          createdAt: { $lt: last24Hours },
          status: "active",
        },
      },
      { $sample: { size: 20 } }, // 🔥 random older posts
    ]);

    res.json({
      success: true,
      posts: [...recentPosts, ...olderPosts],
    });
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

/* =====================================================
   📝 CREATE POST
===================================================== */
exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title required",
      });
    }

    const mediaFile = req.files?.media?.[0];
    const bannerFile = req.files?.banner?.[0];

    if (!mediaFile) {
      return res.status(400).json({
        success: false,
        message: "Media required",
      });
    }

    const post = await Post.create({
      title,
      description,
      mediaType: mediaFile.resource_type,
      mediaUrl: mediaFile.path,
      bannerUrl: bannerFile ? bannerFile.path : null,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Post create failed",
    });
  }
};

/* =====================================================
   ✏ UPDATE POST
===================================================== */
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const { title, description } = req.body;
    const mediaFile = req.files?.media?.[0];
    const bannerFile = req.files?.banner?.[0];

    if (title) post.title = title;
    if (description) post.description = description;

    // 🔥 Update media
    if (mediaFile && post.mediaUrl) {
      const oldMediaId = post.mediaUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(
        `posts/media/${oldMediaId}`,
        { resource_type: post.mediaType }
      );

      post.mediaType = mediaFile.resource_type;
      post.mediaUrl = mediaFile.path;
    }

    // 🔥 Update banner
    if (bannerFile && post.bannerUrl) {
      const oldBannerId = post.bannerUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`posts/banner/${oldBannerId}`);
      post.bannerUrl = bannerFile.path;
    }

    await post.save();
    res.json({ success: true, post });
  } catch (err) {
    console.error("UPDATE POST ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

/* =====================================================
   🗑 DELETE POST
===================================================== */
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false });
    }

    // delete media
    const mediaId = post.mediaUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `posts/media/${mediaId}`,
      { resource_type: post.mediaType }
    );

    // delete banner
    if (post.bannerUrl) {
      const bannerId = post.bannerUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`posts/banner/${bannerId}`);
    }

    await post.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE POST ERROR:", err);
    res.status(500).json({ success: false });
  }
};
