// backend/models/Slider.js
const mongoose = require("mongoose");

const sliderImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { _id: false });

const sliderSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  images: [sliderImageSchema],
  updatedBy: { type: mongoose.Types.ObjectId, ref: "user" }
}, { timestamps: true });

module.exports = mongoose.model("Slider", sliderSchema);
