// backend/routes/upload.routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImages } = require("../controller/upload.controller");
const { debugCloudinary } = require("../utils/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Debug config (بدون لو دادن secret)
router.get("/upload/debug", (req, res) => {
  return res.json({ success: true, config: debugCloudinary() });
});

// Upload endpoint
router.post("/upload/images", upload.array("images", 6), uploadImages);

module.exports = router;
