// controller/user/deleteUser.js
const userModel = require("../../models/userModel");

module.exports = async function deleteUser(req, res) {
  try {
    // فقط ادمین اجازه حذف دارد
    const me = await userModel.findById(req.userId).select("role");
    if (!me || me.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { id } = req.params;

    // جلوگیری از حذفِ خود ادمین
    if (String(id) === String(req.userId)) {
      return res.status(400).json({ success: false, message: "You cannot delete your own account." });
    }

    const deleted = await userModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};
