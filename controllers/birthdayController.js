// const Birthday = require("../models/birthdayModel");
// const { v2: cloudinary } = require("cloudinary");

// /* ===============================
//    GET BIRTHDAYS
// =============================== */
// exports.getBirthdays = async (req, res) => {
//   try {
//     const { search = "", page = 1, limit = 10 } = req.query;

//     const query = search
//       ? { name: { $regex: search, $options: "i" } }
//       : {};

//     const total = await Birthday.countDocuments(query);

//     const birthdays = await Birthday.find(query)
//       .skip((page - 1) * limit)
//       .limit(Number(limit))
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       birthdays,
//       total,
//       pages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.error("❌ GET ERROR:", err);
//     res.status(500).json({ success: false, error: "Fetch failed" });
//   }
// };

// /* ===============================
//    CREATE BIRTHDAY
//    PHOTO = IMAGE / VIDEO
// =============================== */
// exports.createBirthday = async (req, res) => {
//   try {
//     const {
//       title,
//       name,
//       date,
//       status,
//       zoom,
//       offsetX,
//       offsetY,
//       bannerZoom,
//       bannerX,
//       bannerY,
//     } = req.body;

//     const photo = req.files?.photo?.[0] || null;
//     const banner = req.files?.banner?.[0] || null;

//     const birthday = await Birthday.create({
//       title,
//       name,
//       date,
//       status: status || "active",

//       /* PHOTO */
//       photo: photo?.path || "",
//       photoPublicId: photo?.filename || "",
//       photoType: photo?.mimetype?.startsWith("video")
//         ? "video"
//         : "image",

//       /* BANNER */
//       banner: banner?.path || "",
//       bannerPublicId: banner?.filename || "",

//       /* CONTROLS */
//       zoom: Number(zoom) || 1,
//       offsetX: Number(offsetX) || 0,
//       offsetY: Number(offsetY) || 0,

//       bannerZoom: Number(bannerZoom) || 1,
//       bannerX: Number(bannerX) || 0,
//       bannerY: Number(bannerY) || 0,
//     });

//     res.json({
//       success: true,
//       message: "Birthday Added",
//       birthday,
//     });
//   } catch (err) {
//     console.error("❌ CREATE ERROR:", err);
//     res.status(500).json({ success: false, error: "Create failed" });
//   }
// };

// /* ===============================
//    UPDATE BIRTHDAY
// =============================== */
// exports.updateBirthday = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = { ...req.body };

//     const bday = await Birthday.findById(id);
//     if (!bday) {
//       return res.status(404).json({ success: false, error: "Not found" });
//     }

//     /* PHOTO UPDATE (IMAGE / VIDEO) */
//     if (req.files?.photo?.[0]) {
//       if (bday.photoPublicId) {
//         await cloudinary.uploader.destroy(bday.photoPublicId, {
//           resource_type: bday.photoType || "image",
//         });
//       }

//       const f = req.files.photo[0];
//       data.photo = f.path;
//       data.photoPublicId = f.filename;
//       data.photoType = f.mimetype.startsWith("video")
//         ? "video"
//         : "image";
//     }

//     /* BANNER UPDATE */
//     if (req.files?.banner?.[0]) {
//       if (bday.bannerPublicId) {
//         await cloudinary.uploader.destroy(bday.bannerPublicId);
//       }

//       const f = req.files.banner[0];
//       data.banner = f.path;
//       data.bannerPublicId = f.filename;
//     }

//     const updated = await Birthday.findByIdAndUpdate(id, data, {
//       new: true,
//     });

//     res.json({
//       success: true,
//       message: "Birthday Updated",
//       birthday: updated,
//     });
//   } catch (err) {
//     console.error("❌ UPDATE ERROR:", err);
//     res.status(500).json({ success: false, error: "Update failed" });
//   }
// };

// /* ===============================
//    DELETE BIRTHDAY
// =============================== */
// exports.deleteBirthday = async (req, res) => {
//   try {
//     const bday = await Birthday.findById(req.params.id);
//     if (!bday) {
//       return res.status(404).json({ success: false, error: "Not found" });
//     }

//     /* DELETE PHOTO */
//     if (bday.photoPublicId) {
//       await cloudinary.uploader.destroy(bday.photoPublicId, {
//         resource_type: bday.photoType || "image",
//       });
//     }

//     /* DELETE BANNER */
//     if (bday.bannerPublicId) {
//       await cloudinary.uploader.destroy(bday.bannerPublicId);
//     }

//     await Birthday.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Deleted",
//     });
//   } catch (err) {
//     console.error("❌ DELETE ERROR:", err);
//     res.status(500).json({ success: false, error: "Delete failed" });
//   }
// };


const Birthday = require("../models/birthdayModel");
const { v2: cloudinary } = require("cloudinary");

/* ===============================
   GET BIRTHDAYS
=============================== */
exports.getBirthdays = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const total = await Birthday.countDocuments(query);

    const birthdays = await Birthday.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      birthdays,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("❌ GET ERROR:", err);
    res.status(500).json({ success: false, error: "Fetch failed" });
  }
};

/* ===============================
   CREATE BIRTHDAY
=============================== */
exports.createBirthday = async (req, res) => {
  try {
    const {
      title,
      name,
      date,
      status,

      zoom,
      offsetX,
      offsetY,

      bannerZoom,
      bannerX,
      bannerY,

      // 🔥 PROFILE
      profileSize,
      profileShape,
      profilePosition,

      // 🔥 PROFILE ANIMATION
      profileAnimation,
      profileAnimationDuration,
      profileAnimationDelay,

      // 🔥 TRANSITION
      transitionType,
      transitionDuration,
      transitionDelay,
    } = req.body;

    const photo = req.files?.photo?.[0] || null;
    const banner = req.files?.banner?.[0] || null;

    const birthday = await Birthday.create({
      title,
      name,
      date,
      status: status || "active",

      /* PHOTO */
      photo: photo?.path || "",
      photoPublicId: photo?.filename || "",
      photoType: photo?.mimetype?.startsWith("video")
        ? "video"
        : "image",

      /* BANNER */
      banner: banner?.path || "",
      bannerPublicId: banner?.filename || "",

      /* PHOTO CONTROLS */
      zoom: Number(zoom) || 1,
      offsetX: Number(offsetX) || 0,
      offsetY: Number(offsetY) || 0,

      /* BANNER CONTROLS */
      bannerZoom: Number(bannerZoom) || 1,
      bannerX: Number(bannerX) || 0,
      bannerY: Number(bannerY) || 0,

      /* PROFILE */
      profile: {
        size: Number(profileSize) || 140,
        shape: profileShape || "circle",
        position: profilePosition || "center",
      },

      /* PROFILE ANIMATION */
      animation: {
        profile: {
          effect: profileAnimation || "fadeIn",
          duration: Number(profileAnimationDuration) || 0.6,
          delay: Number(profileAnimationDelay) || 0,
        },
      },

      /* TRANSITION */
      transition: {
        type: transitionType || "fade",
        duration: Number(transitionDuration) || 0.8,
        delay: Number(transitionDelay) || 0,
      },
    });

    res.json({
      success: true,
      message: "Birthday Added",
      birthday,
    });
  } catch (err) {
    console.error("❌ CREATE ERROR:", err);
    res.status(500).json({ success: false, error: "Create failed" });
  }
};

/* ===============================
   UPDATE BIRTHDAY
=============================== */
exports.updateBirthday = async (req, res) => {
  try {
    const id = req.params.id;
    const bday = await Birthday.findById(id);

    if (!bday) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    const data = { ...req.body };

    /* PHOTO UPDATE */
    if (req.files?.photo?.[0]) {
      if (bday.photoPublicId) {
        await cloudinary.uploader.destroy(bday.photoPublicId, {
          resource_type: bday.photoType || "image",
        });
      }

      const f = req.files.photo[0];
      data.photo = f.path;
      data.photoPublicId = f.filename;
      data.photoType = f.mimetype.startsWith("video") ? "video" : "image";
    }

    /* BANNER UPDATE */
    if (req.files?.banner?.[0]) {
      if (bday.bannerPublicId) {
        await cloudinary.uploader.destroy(bday.bannerPublicId);
      }

      const f = req.files.banner[0];
      data.banner = f.path;
      data.bannerPublicId = f.filename;
    }

    /* 🔥 STRUCTURE FIX */
    data.profile = {
      size: Number(req.body.profileSize) || bday.profile?.size,
      shape: req.body.profileShape || bday.profile?.shape,
      position: req.body.profilePosition || bday.profile?.position,
    };

    data.animation = {
      profile: {
        effect: req.body.profileAnimation || bday.animation?.profile?.effect,
        duration:
          Number(req.body.profileAnimationDuration) ||
          bday.animation?.profile?.duration,
        delay:
          Number(req.body.profileAnimationDelay) ||
          bday.animation?.profile?.delay,
      },
    };

    data.transition = {
      type: req.body.transitionType || bday.transition?.type,
      duration:
        Number(req.body.transitionDuration) || bday.transition?.duration,
      delay:
        Number(req.body.transitionDelay) || bday.transition?.delay,
    };

    const updated = await Birthday.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({
      success: true,
      message: "Birthday Updated",
      birthday: updated,
    });
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err);
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

/* ===============================
   DELETE BIRTHDAY
=============================== */
exports.deleteBirthday = async (req, res) => {
  try {
    const bday = await Birthday.findById(req.params.id);
    if (!bday) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    if (bday.photoPublicId) {
      await cloudinary.uploader.destroy(bday.photoPublicId, {
        resource_type: bday.photoType || "image",
      });
    }

    if (bday.bannerPublicId) {
      await cloudinary.uploader.destroy(bday.bannerPublicId);
    }

    await Birthday.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Birthday Deleted",
    });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};
