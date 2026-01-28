
// const Ads = require("../models/ads.model");
// const cloudinary = require("../config/cloudinary");

// /* ================================
//    ➕ CREATE AD (ADMIN)
// ================================ */
// exports.createAd = async (req, res) => {
//   try {
//     let uploadRes = null;

//     if (req.file && req.file.buffer) {
//       uploadRes = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//           { folder: "crafto/ads", resource_type: "auto" },
//           (err, result) => (err ? reject(err) : resolve(result))
//         ).end(req.file.buffer);
//       });
//     }

//     // 🔥 GST CALCULATION
//     const price = Number(req.body.price || 2);
//     const gstPercent = Number(req.body.gstPercent || 0);
//     const gstAmount = (price * gstPercent) / 100;
//     const finalAmount = price + gstAmount;

//     const ad = await Ads.create({
//       quote: req.body.quote,

//       price,
//       gstPercent,
//       gstAmount,
//       finalAmount,

//       mediaUrl: uploadRes?.secure_url || "",
//       mediaType: uploadRes?.resource_type || "",
//       publicId: uploadRes?.public_id || "",

//       status: "active",
//     });

//     res.status(201).json(ad);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Ad create failed" });
//   }
// };

// /* ================================
//    📥 GET ALL ADS (ADMIN)
// ================================ */
// exports.getAds = async (req, res) => {
//   try {
//     const ads = await Ads.find().sort({ createdAt: -1 });
//     res.json(ads);
//   } catch {
//     res.status(500).json({ message: "Failed to fetch ads" });
//   }
// };

// /* ================================
//    ✏️ UPDATE AD (ADMIN)
// ================================ */
// exports.updateAd = async (req, res) => {
//   try {
//     const ad = await Ads.findById(req.params.id);
//     if (!ad) return res.status(404).json({ message: "Ad not found" });

//     // 🔁 Replace media
//     if (req.file && req.file.buffer) {
//       if (ad.publicId) {
//         await cloudinary.uploader.destroy(ad.publicId, {
//           resource_type: ad.mediaType || "image",
//         });
//       }

//       const uploadRes = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//           { folder: "crafto/ads", resource_type: "auto" },
//           (err, result) => (err ? reject(err) : resolve(result))
//         ).end(req.file.buffer);
//       });

//       ad.mediaUrl = uploadRes.secure_url;
//       ad.mediaType = uploadRes.resource_type;
//       ad.publicId = uploadRes.public_id;
//     }

//     // 🔥 GST RECALCULATION
//     const price = Number(req.body.price ?? ad.price);
//     const gstPercent = Number(req.body.gstPercent ?? ad.gstPercent);
//     const gstAmount = (price * gstPercent) / 100;
//     const finalAmount = price + gstAmount;

//     ad.quote = req.body.quote ?? ad.quote;
//     ad.price = price;
//     ad.gstPercent = gstPercent;
//     ad.gstAmount = gstAmount;
//     ad.finalAmount = finalAmount;

//     await ad.save();
//     res.json(ad);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// /* ================================
//    🔁 TOGGLE STATUS (ADMIN)
// ================================ */
// exports.toggleStatus = async (req, res) => {
//   const ad = await Ads.findById(req.params.id);
//   if (!ad) return res.status(404).json({ message: "Ad not found" });

//   ad.status = ad.status === "active" ? "inactive" : "active";
//   await ad.save();

//   res.json(ad);
// };

// /* ================================
//    🗑️ DELETE AD (ADMIN)
// ================================ */
// exports.deleteAd = async (req, res) => {
//   const ad = await Ads.findById(req.params.id);
//   if (!ad) return res.status(404).json({ message: "Ad not found" });

//   if (ad.publicId) {
//     await cloudinary.uploader.destroy(ad.publicId, {
//       resource_type: ad.mediaType || "image",
//     });
//   }

//   await ad.deleteOne();
//   res.json({ success: true });
// };

// /* ================================
//    📱 GET ACTIVE ADS (APP / PUBLIC)
// ================================ */
// exports.getActiveAds = async (req, res) => {
//   const ads = await Ads.find({ status: "active" })
//     .sort({ createdAt: -1 });

//   res.json(ads);
// };

const Ads = require("../models/ads.model");

/* =================================================
   ➕ CREATE AD (ANNIVERSARY STYLE)
================================================= */
exports.createAd = async (req, res) => {
  try {
    const body = req.body;

    const mainFile = req.files?.file?.[0];
    const bannerFiles = req.files?.banners || [];

    /* ---------- BANNERS ---------- */
    const banners = bannerFiles.map((b) => ({
      imageUrl: b.path,
      publicId: b.filename,
    }));

    /* ---------- GST CALC ---------- */
    const price = Number(body.price || 2);
    const gstPercent = Number(body.gstPercent || 0);
    const gstAmount = (price * gstPercent) / 100;

    /* ---------- CREATE ---------- */
    const ad = await Ads.create({
      quote: body.quote,

      price,
      gstPercent,
      gstAmount,
      finalAmount: price + gstAmount,

      mediaUrl: mainFile?.path || "",
      mediaType: mainFile?.mimetype?.startsWith("video")
        ? "video"
        : "image",
      publicId: mainFile?.filename || "",

      banners,
      status: "active",
    });

    res.status(201).json({
      success: true,
      ad,
    });
  } catch (err) {
    console.error("❌ CREATE AD ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* =================================================
   📥 GET ALL ADS (ADMIN)
================================================= */
exports.getAds = async (req, res) => {
  try {
    const ads = await Ads.find().sort({ createdAt: -1 });
    res.json({ success: true, ads });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetch failed",
    });
  }
};

/* =================================================
   ✏️ UPDATE AD (SAFE MERGE)
================================================= */
exports.updateAd = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (!ad) {
      return res
        .status(404)
        .json({ success: false, message: "Ad not found" });
    }

    /* ---------- MAIN FILE UPDATE ---------- */
    if (req.files?.file?.[0]) {
      const file = req.files.file[0];

      ad.mediaUrl = file.path;
      ad.publicId = file.filename;
      ad.mediaType = file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    /* ---------- ADD NEW BANNERS ---------- */
    if (req.files?.banners?.length) {
      const newBanners = req.files.banners.map((b) => ({
        imageUrl: b.path,
        publicId: b.filename,
      }));

      ad.banners.push(...newBanners);
    }

    /* ---------- UPDATE FIELDS ---------- */
    const price = Number(req.body.price ?? ad.price);
    const gstPercent = Number(req.body.gstPercent ?? ad.gstPercent);

    ad.quote = req.body.quote ?? ad.quote;
    ad.price = price;
    ad.gstPercent = gstPercent;
    ad.gstAmount = (price * gstPercent) / 100;
    ad.finalAmount = ad.price + ad.gstAmount;

    await ad.save();

    res.json({
      success: true,
      ad,
    });
  } catch (err) {
    console.error("❌ UPDATE AD ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* =================================================
   🔁 TOGGLE STATUS
================================================= */
exports.toggleStatus = async (req, res) => {
  const ad = await Ads.findById(req.params.id);
  if (!ad) {
    return res
      .status(404)
      .json({ success: false, message: "Ad not found" });
  }

  ad.status = ad.status === "active" ? "inactive" : "active";
  await ad.save();

  res.json({ success: true, ad });
};

/* =================================================
   🗑️ DELETE AD
================================================= */
exports.deleteAd = async (req, res) => {
  const ad = await Ads.findById(req.params.id);
  if (!ad) {
    return res
      .status(404)
      .json({ success: false, message: "Ad not found" });
  }

  await ad.deleteOne();

  res.json({
    success: true,
    message: "Ad deleted successfully",
  });
};

/* =================================================
   📱 GET ACTIVE ADS (PUBLIC / APP)
================================================= */
exports.getActiveAds = async (req, res) => {
  const ads = await Ads.find({ status: "active" }).sort({
    createdAt: -1,
  });

  res.json({ success: true, ads });
};
