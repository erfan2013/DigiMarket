// backend/controller/slider.controller.js
const Slider = require("../models/Slider");
const { cloudinary, isConfigured } = require("../utils/cloudinary");
const streamifier = require("streamifier");

exports.getPublicSlider = async (req, res) => {
  const doc = await Slider.findOne({}).sort({ updatedAt: -1 }).lean();
  const images = (doc?.isActive ? doc?.images : [])?.sort((a,b)=>a.order-b.order) || [];
  res.json({ success:true, images });
};

exports.createOrAppend = async (req, res) => {
  try {
    if (!isConfigured) return res.status(503).json({ success:false, message:"Cloudinary not configured" });
    const files = req.files || [];
    if (!files.length) return res.status(400).json({ success:false, message:"No files" });

    // آپلود چندتایی
    const uploads = await Promise.all(files.map(f => new Promise((resolve, reject) => {
      const up = cloudinary.uploader.upload_stream(
        { folder: "home-slider", resource_type: "image" },
        (err, result) => err ? reject(err) : resolve(result)
      );
      streamifier.createReadStream(f.buffer).pipe(up);
    })));

    // دریافت/ساخت سند اسلایدر
    let slider = await Slider.findOne({});
    if (!slider) slider = await Slider.create({ images: [] });

    const baseOrder = slider.images.length ? Math.max(...slider.images.map(i=>i.order))+1 : 0;
    uploads.forEach((u, idx) => {
      slider.images.push({ url: u.secure_url, publicId: u.public_id, order: baseOrder + idx });
    });
    slider.updatedBy = req.userId || null;
    await slider.save();

    res.json({ success:true, data:slider });
  } catch (e) {
    res.status(500).json({ success:false, message:e.message });
  }
};

exports.reorder = async (req, res) => {
  // body: [{publicId, order}]
  const { orders = [], isActive } = req.body || {};
  const slider = await Slider.findOne({});
  if (!slider) return res.status(404).json({ success:false, message:"Slider not found" });

  if (Array.isArray(orders) && orders.length) {
    const map = new Map(orders.map(o => [o.publicId, o.order]));
    slider.images = slider.images.map(img => ({
      ...img.toObject(),
      order: map.has(img.publicId) ? Number(map.get(img.publicId)) : img.order
    }));
  }
  if (typeof isActive === "boolean") slider.isActive = isActive;
  slider.updatedBy = req.userId || null;
  await slider.save();
  res.json({ success:true, data: slider });
};

exports.removeImage = async (req, res) => {
  const { publicId } = req.params;
  const slider = await Slider.findOne({});
  if (!slider) return res.status(404).json({ success:false, message:"Slider not found" });

  slider.images = slider.images.filter(i => i.publicId !== publicId);
  await slider.save();
  // حذف از کلودینری (اختیاری ولی بهتره)
  try { await cloudinary.uploader.destroy(publicId); } catch {}
  res.json({ success:true, data: slider });
};
