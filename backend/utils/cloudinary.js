// backend/utils/cloudinary.js
const cloudinary = require("cloudinary").v2;

const conf = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(conf);

const isConfigured = Boolean(conf.cloud_name && conf.api_key && conf.api_secret);

// اگر کانفیگ ناقص باشه، می‌گیم کدومش خالیه (بدون لو دادن secret)
const reason = isConfigured
  ? null
  : {
      cloud_name_set: !!conf.cloud_name,
      api_key_set: !!conf.api_key,
      api_secret_set: !!conf.api_secret,
    };

function debugCloudinary() {
  return {
    cloud_name: conf.cloud_name || null,
    api_key_set: !!conf.api_key,
    isConfigured,
    reason,
  };
}

module.exports = { cloudinary, isConfigured, reason, debugCloudinary };
