const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
const path = require("path");
const userModel = require("../../models/userModel");

// ساخت URL درست پشت پراکسی/HTTPS
function buildFileUrl(req, filename) {
  const proto = (req.headers["x-forwarded-proto"] || req.protocol || "http").split(",")[0];
  const host = req.headers["x-forwarded-host"] || req.get("host");
  return `${proto}://${host}/uploads/${filename}`;
}

exports.getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId, "-password -__v");
    if (!user) return res.status(404).json({ success:false, error:true, message:"User not found" });
    res.json({ success:true, error:false, data:user });
  } catch (e) {
    res.status(500).json({ success:false, error:true, message:e.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, phone, address } = req.body || {};
    const update = {};
    if (typeof name === "string") update.name = name.trim();
    if (typeof phone === "string") update.phone = phone.trim();
    if (typeof address === "string") update.address = address.trim();

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { $set: update },
      { new: true, select: "-password -__v" }
    );

    res.json({ success:true, error:false, message:"Profile updated", data:user });
  } catch (e) {
    res.status(400).json({ success:false, error:true, message:e.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword)
      return res.status(400).json({ success:false, error:true, message:"Both currentPassword and newPassword are required" });

    const user = await userModel.findById(req.userId).select("+password");
    if (!user) return res.status(404).json({ success:false, error:true, message:"User not found" });

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) return res.status(401).json({ success:false, error:true, message:"Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success:true, error:false, message:"Password changed successfully" });
  } catch (e) {
    res.status(400).json({ success:false, error:true, message:e.message });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success:false, error:true, message:"No file uploaded" });
    }

    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ success:false, error:true, message:"User not found" });

    // حذف فایل قبلی اگر لوکال بود (اختیاری)
    if (user.avatar && user.avatar.startsWith("/uploads/")) {
      const oldPath = path.join(__dirname, "..", "..", user.avatar.replace("/uploads/", "uploads/"));
      fs.unlink(oldPath).catch(() => {});
    }

    const fileUrl = buildFileUrl(req, req.file.filename);
    user.avatar = fileUrl;
    await user.save();

    const clean = await userModel.findById(user._id, "-password -__v");
    res.json({ success:true, error:false, message:"Avatar updated", data:clean });
  } catch (e) {
    res.status(400).json({ success:false, error:true, message:e.message });
  }
};
// اگر بخواهید آواتار را حذف کنید
// exports.deleteAvatar = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.userId);
//     if (!user) return res.status(404).json({ success:false, error:true, message:"User not found" });
//   } catch (e) {
//     res.status(400).json({ success:false, error:true, message:e.message });
//   }
// };