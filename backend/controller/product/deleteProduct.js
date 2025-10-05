const productModel = require("../../models/ProductModel");
const uploadProductPermisson = require("../../helpers/Permisson");

async function deleteProductController(req, res) {
  try {
    const userId = req.userId;
    if (!uploadProductPermisson(userId)) {
      return res.status(403).json({ success: false, error: true, message: "Forbidden" });
    }

    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, error: true, message: "Product id is required" });

    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: true, message: "Product not found" });
    }

    return res.json({ success: true, error: false, message: "Product deleted", data: deleted });
  } catch (e) {
    return res.status(500).json({ success: false, error: true, message: e.message || "Server error" });
  }
}

module.exports = deleteProductController;
