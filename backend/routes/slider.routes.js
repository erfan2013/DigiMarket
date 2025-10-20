// backend/routes/slider.routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const authToken = require("../middleware/authToken");
const {
  getPublicSlider,
  createOrAppend,
  reorder,
  removeImage,
} = require("../controller/slider.controller");

const upload = multer({ storage: multer.memoryStorage() });
router.get("/slider", getPublicSlider);


// ادمین (نیاز به authToken و نقش ADMIN اگر نقش‌بندی داری)
router.get("/admin/slider", authToken, getPublicSlider); // اختیاری
router.post("/admin/slider", authToken, upload.array("images", 10), createOrAppend);
router.patch("/admin/slider", authToken, reorder);
router.delete("/admin/slider/:publicId(*)", authToken, removeImage);

module.exports = router;
