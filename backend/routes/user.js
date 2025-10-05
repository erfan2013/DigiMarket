const express = require("express");
const router = express.Router();

const authToken = require("../middleware/authToken");
const {
  getMe,
  updateMe,
  changePassword,
  updateAvatar,
} = require("../controller/user/meController");

// Multer برای آپلود آواتار
const multer = require("multer");
const path = require("path");

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safe =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, safe);
  },
});
function fileFilter(req, file, cb) {
  const ok = ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
    file.mimetype
  );
  cb(ok ? null : new Error("Only PNG/JPG/JPEG/WEBP allowed"), ok);
}
const upload = multer({ storage, limits: { fileSize: MAX_SIZE }, fileFilter });

// پروفایل
router.get("/me", authToken, getMe);
router.patch("/me/password", authToken, changePassword);
router.patch("/change-password", authToken, changePassword);

// آواتار
router.patch("/me/avatar", authToken, upload.single("avatar"), updateAvatar);

module.exports = router;