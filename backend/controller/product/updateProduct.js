// backend/controller/product/updateProduct.js
const Product = require("../../models/ProductModel");
const uploadProductPermisson = require("../../helpers/Permisson");

module.exports = async function updateProductController(req, res) {
  try {
    // 1) دسترسی
    if (!uploadProductPermisson(req.userId)) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update product",
      });
    }

    // 2) شناسه از params یا body
    const id = req.params?.id || req.body?._id;
    if (!id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Missing product id",
      });
    }

    // 3) وایت‌لیست فیلدها + نرمال‌سازی
    const allowed = [
      "ProductName",
      "BrandName",
      "category",
      "Selling",
      "Price",
      "Description",
      "ProductImage",
    ];

    const update = {};
    for (const k of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, k)) {
        update[k] = req.body[k];
      }
    }

    // عددی کردن قیمت‌ها
    if (update.Selling != null) update.Selling = Number(update.Selling) || 0;
    if (update.Price != null) update.Price = Number(update.Price) || 0;

    // آرایه‌ی عکس‌ها
    if (Array.isArray(update.ProductImage)) {
      update.ProductImage = update.ProductImage.filter(Boolean);
    }

    // 4) آپدیت با اعتبارسنجی و برگرداندن سند جدید
    const doc = await Product.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product updated successfully",
      data: doc,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Server error",
    });
  }
};
