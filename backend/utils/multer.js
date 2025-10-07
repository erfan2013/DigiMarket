const multer = require("multer");
const storage = multer.memoryStorage(); // فایل‌ها توی RAM، بعد می‌فرستیم کلودینری
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
module.exports = upload;
