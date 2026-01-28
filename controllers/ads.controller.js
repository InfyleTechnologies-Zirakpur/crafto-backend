
const Ads = require("../models/ads.model");
const cloudinary = require("../config/cloudinary");

/* ================================
   ➕ CREATE AD (ADMIN)
================================ */
exports.createAd = async (req, res) => {
  try {
    let uploadRes = null;

    if (req.file && req.file.buffer) {
      uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "crafto/ads", resource_type: "auto" },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(req.file.buffer);
      });
    }

    // 🔥 GST CALCULATION
    const price = Number(req.body.price || 2);
    const gstPercent = Number(req.body.gstPercent || 0);
    const gstAmount = (price * gstPercent) / 100;
    const finalAmount = price + gstAmount;

    const ad = await Ads.create({
      quote: req.body.quote,

      price,
      gstPercent,
      gstAmount,
      finalAmount,

      mediaUrl: uploadRes?.secure_url || "",
      mediaType: uploadRes?.resource_type || "",
      publicId: uploadRes?.public_id || "",

      status: "active",
    });

    res.status(201).json(ad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ad create failed" });
  }
};

/* ================================
   📥 GET ALL ADS (ADMIN)
================================ */
exports.getAds = async (req, res) => {
  try {
    const ads = await Ads.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch {
    res.status(500).json({ message: "Failed to fetch ads" });
  }
};

/* ================================
   ✏️ UPDATE AD (ADMIN)
================================ */
exports.updateAd = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    // 🔁 Replace media
    if (req.file && req.file.buffer) {
      if (ad.publicId) {
        await cloudinary.uploader.destroy(ad.publicId, {
          resource_type: ad.mediaType || "image",
        });
      }

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "crafto/ads", resource_type: "auto" },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(req.file.buffer);
      });

      ad.mediaUrl = uploadRes.secure_url;
      ad.mediaType = uploadRes.resource_type;
      ad.publicId = uploadRes.public_id;
    }

    // 🔥 GST RECALCULATION
    const price = Number(req.body.price ?? ad.price);
    const gstPercent = Number(req.body.gstPercent ?? ad.gstPercent);
    const gstAmount = (price * gstPercent) / 100;
    const finalAmount = price + gstAmount;

    ad.quote = req.body.quote ?? ad.quote;
    ad.price = price;
    ad.gstPercent = gstPercent;
    ad.gstAmount = gstAmount;
    ad.finalAmount = finalAmount;

    await ad.save();
    res.json(ad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================================
   🔁 TOGGLE STATUS (ADMIN)
================================ */
exports.toggleStatus = async (req, res) => {
  const ad = await Ads.findById(req.params.id);
  if (!ad) return res.status(404).json({ message: "Ad not found" });

  ad.status = ad.status === "active" ? "inactive" : "active";
  await ad.save();

  res.json(ad);
};

/* ================================
   🗑️ DELETE AD (ADMIN)
================================ */
exports.deleteAd = async (req, res) => {
  const ad = await Ads.findById(req.params.id);
  if (!ad) return res.status(404).json({ message: "Ad not found" });

  if (ad.publicId) {
    await cloudinary.uploader.destroy(ad.publicId, {
      resource_type: ad.mediaType || "image",
    });
  }

  await ad.deleteOne();
  res.json({ success: true });
};

/* ================================
   📱 GET ACTIVE ADS (APP / PUBLIC)
================================ */
exports.getActiveAds = async (req, res) => {
  const ads = await Ads.find({ status: "active" })
    .sort({ createdAt: -1 });

  res.json(ads);
};
