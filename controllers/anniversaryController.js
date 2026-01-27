// const Anniversary = require("../models/Anniversary");

// /* ======================================================
//    GET ANNIVERSARIES (LIST + SEARCH + PAGINATION)
// ====================================================== */
// exports.getBirthdays = async (req, res) => {
//   try {
//     const { search = "", page = 1, limit = 10 } = req.query;

//     const query = search
//       ? { name: { $regex: search, $options: "i" } }
//       : {};

//     const total = await Anniversary.countDocuments(query);

//     const anniversaries = await Anniversary.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     res.json({
//       anniversaries,
//       total,
//       pages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.error("❌ GET ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ======================================================
//    CREATE ANNIVERSARY (IMAGE / VIDEO + BANNER)
// ====================================================== */
// exports.createBirthday = async (req, res) => {
//   try {
//     const body = req.body;

//     const mediaFile = req.files?.media?.[0];
//     const bannerFile = req.files?.banner?.[0];

//     const doc = await Anniversary.create({
//       title: body.title,
//       name: body.name,
//       date: body.date,
//       status: body.status || "active",

//       // MEDIA (image / video)
//       media: mediaFile?.path || "",
//       mediaPublicId: mediaFile?.filename || "",
//       mediaType: mediaFile?.mimetype?.startsWith("video")
//         ? "video"
//         : "image",

//       // BANNER
//       banner: bannerFile?.path || "",
//       bannerPublicId: bannerFile?.filename || "",

//       zoom: Number(body.zoom) || 1,
//       offsetX: Number(body.offsetX) || 0,
//       offsetY: Number(body.offsetY) || 0,

//       bannerZoom: Number(body.bannerZoom) || 1,
//       bannerX: Number(body.bannerX) || 0,
//       bannerY: Number(body.bannerY) || 0,
//     });

//     res.status(201).json({
//       success: true,
//       anniversary: doc,
//     });
//   } catch (err) {
//     console.error("❌ CREATE ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ======================================================
//    UPDATE ANNIVERSARY
// ====================================================== */
// exports.updateBirthday = async (req, res) => {
//   try {
//     const existing = await Anniversary.findById(req.params.id);
//     if (!existing) {
//       return res.status(404).json({ error: "Anniversary not found" });
//     }

//     const data = { ...req.body };

//     // MEDIA UPDATE
//     if (req.files?.media?.[0]) {
//       const file = req.files.media[0];
//       data.media = file.path;
//       data.mediaPublicId = file.filename;
//       data.mediaType = file.mimetype.startsWith("video")
//         ? "video"
//         : "image";
//     }

//     // BANNER UPDATE
//     if (req.files?.banner?.[0]) {
//       const file = req.files.banner[0];
//       data.banner = file.path;
//       data.bannerPublicId = file.filename;
//     }

//     const updated = await Anniversary.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       anniversary: updated,
//     });
//   } catch (err) {
//     console.error("❌ UPDATE ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ======================================================
//    DELETE ANNIVERSARY
// ====================================================== */
// exports.deleteBirthday = async (req, res) => {
//   try {
//     const existing = await Anniversary.findById(req.params.id);
//     if (!existing) {
//       return res.status(404).json({ error: "Anniversary not found" });
//     }

//     await Anniversary.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Anniversary deleted successfully",
//     });
//   } catch (err) {
//     console.error("❌ DELETE ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

const Anniversary = require("../models/Anniversary");

/* ======================================================
   GET ANNIVERSARIES (LIST + SEARCH + PAGINATION)
====================================================== */
exports.getBirthdays = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const total = await Anniversary.countDocuments(query);

    const anniversaries = await Anniversary.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      anniversaries,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("❌ GET ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ======================================================
   CREATE ANNIVERSARY (OLD + NEW SUPPORT)
====================================================== */
exports.createBirthday = async (req, res) => {
  try {
    const body = req.body;

    const mediaFile = req.files?.media?.[0];
    const bannerFile = req.files?.banner?.[0];

    const anniversary = await Anniversary.create({
      /* ============== BASIC INFO ============== */
      title: body.title,
      name: body.name,
      date: body.date,
      status: body.status || "active",

      /* ============== MEDIA ============== */
      media: mediaFile?.path || "",
      mediaPublicId: mediaFile?.filename || "",
      mediaType: mediaFile?.mimetype?.startsWith("video")
        ? "video"
        : "image",

      /* ============== BANNER ============== */
      banner: bannerFile?.path || "",
      bannerPublicId: bannerFile?.filename || "",

      /* ============== OLD CONTROLS (KEEP) ============== */
      zoom: Number(body.zoom) || 1,
      offsetX: Number(body.offsetX) || 0,
      offsetY: Number(body.offsetY) || 0,

      bannerZoom: Number(body.bannerZoom) || 1,
      bannerX: Number(body.bannerX) || 0,
      bannerY: Number(body.bannerY) || 0,

      /* ============== NEW TRANSITION ============== */
      transition: {
        placement: body.transitionPlacement || "below",
        type: body.transitionType || "fade",
        duration: Number(body.transitionDuration) || 0.8,
      },

      /* ============== NEW ANIMATION ============== */
      animation: {
        profile: {
          effect: body.profileAnimation || "fadeIn",
          delay: Number(body.profileDelay) || 0,
          duration: Number(body.profileDuration) || 0.6,
        },
        text: {
          effect: body.textAnimation || "fadeIn",
          delay: Number(body.textDelay) || 0.2,
          duration: Number(body.textDuration) || 0.5,
        },
      },

      /* ============== NEW PROFILE SETTINGS ============== */
      profile: {
        position: body.profilePosition || "center",
        size: body.profileSize || "140px",
        shape: body.profileShape || "circle",
      },

      /* ============== NEW PROFILE TRANSFORM ============== */
      profileZoom: Number(body.profileZoom) || 1,
      profileX: Number(body.profileX) || 0,
      profileY: Number(body.profileY) || 0,
      profileRotate: Number(body.profileRotate) || 0,

      /* ============== ORIENTATION ============== */
      orientation: body.orientation || "portrait",
    });

    res.status(201).json({
      success: true,
      anniversary,
    });
  } catch (err) {
    console.error("❌ CREATE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ======================================================
   UPDATE ANNIVERSARY (SAFE MERGE)
====================================================== */
exports.updateBirthday = async (req, res) => {
  try {
    const existing = await Anniversary.findById(req.params.id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Anniversary not found" });
    }

    const data = { ...req.body };

    /* ============== MEDIA UPDATE ============== */
    if (req.files?.media?.[0]) {
      const file = req.files.media[0];
      data.media = file.path;
      data.mediaPublicId = file.filename;
      data.mediaType = file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    /* ============== BANNER UPDATE ============== */
    if (req.files?.banner?.[0]) {
      const file = req.files.banner[0];
      data.banner = file.path;
      data.bannerPublicId = file.filename;
    }

    /* ============== NUMBER SAFETY (OLD + NEW) ============== */
    [
      "zoom",
      "offsetX",
      "offsetY",
      "bannerZoom",
      "bannerX",
      "bannerY",
      "profileZoom",
      "profileX",
      "profileY",
      "profileRotate",
    ].forEach((key) => {
      if (data[key] !== undefined) {
        data[key] = Number(data[key]);
      }
    });

    const updated = await Anniversary.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json({
      success: true,
      anniversary: updated,
    });
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ======================================================
   DELETE ANNIVERSARY
====================================================== */
exports.deleteBirthday = async (req, res) => {
  try {
    const existing = await Anniversary.findById(req.params.id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Anniversary not found" });
    }

    await Anniversary.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Anniversary deleted successfully",
    });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
