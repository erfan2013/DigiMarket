// backend/controllers/upload.controller.js
const { cloudinary, isConfigured, reason } = require("../utils/cloudinary");
const streamifier = require("streamifier");

exports.uploadImages = async (req, res) => {
  try {
    if (!isConfigured) {
      return res.status(503).json({
        success: false,
        message: "Upload endpoint not configured",
        reason,
      });
    }

    if (!req.files || !req.files.length) {
      return res.status(400).json({ success: false, message: "No files" });
    }

    const urls = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const up = cloudinary.uploader.upload_stream(
              { folder: "digimarket" },
              (err, result) => {
                if (err) return reject(err);
                resolve(result.secure_url);
              }
            );
            streamifier.createReadStream(file.buffer).pipe(up);
          })
      )
    );

    return res.json({ success: true, urls });
  } catch (err) {
    console.error("upload.images error:", err);
    return res
      .status(err.http_code || 500)
      .json({ success: false, message: err.message || "Upload failed" });
  }
};
