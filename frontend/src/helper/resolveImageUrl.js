// src/helper/resolveImageUrl.js
const BACKEND_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

/**
 * ورودی می‌تونه URL مطلق (Cloudinary و …) یا مسیر نسبی مثل /uploads/.. باشه
 * اگر نسبی بود، با آدرس بک‌اند کاملش می‌کنیم.
 */
export default function resolveImageUrl(u) {
  if (!u) return "/placeholder.png"; // اگه خواستی یه تصویر پیش‌فرض بذار
  if (/^https?:\/\//i.test(u)) return u; // URL مطلق رو همونطور برمی‌گردونیم
  return `${BACKEND_URL}/${String(u).replace(/^\/+/, "")}`; // مسیر نسبی → کامل
}
