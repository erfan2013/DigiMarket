const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    cb(null, Date.now() + "-" + Math.round(Math.random()*1e9) + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith("image/")) return cb(null, true);
  cb(new Error("Only image files are allowed."));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
