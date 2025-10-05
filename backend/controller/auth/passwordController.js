// backend/controller/auth/passwordController.js
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const { sendEmail } = require("../../utils/email");

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Email is required" });
    }

    const user = await userModel.findOne({ email: email.toLowerCase().trim() });

    // پیام کلی برای جلوگیری از user enumeration
    if (!user) {
      return res.json({
        success: true,
        error: false,
        message: "If the email exists, we sent reset link",
      });
    }

    // ساخت توکن و ذخیره نسخه‌ی هش‌شده + انقضا
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = hashToken(token);
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 دقیقه
    await user.save();

    // لینک فرانت (از ENV؛ در پروداکشن حتما FRONTEND_BASE_URL را ست کن)
    const base = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetLink = `${base}/reset-password?token=${token}`;

    // محتوای ایمیل
    const subject = "Reset your password";
    const text = `Use this link to reset your password:\n${resetLink}\nThis link expires in 10 minutes.`;
    const html = `
      <p>Click the link below to reset your password (expires in 10 minutes):</p>
      <p><a href="${resetLink}" target="_blank" rel="noopener noreferrer">${resetLink}</a></p>
    `;

    // فرستنده و ریپلای‌تو از ENV
    const FROM = process.env.MAIL_FROM || process.env.SMTP1_FROM || undefined;
    const REPLY_TO = process.env.MAIL_REPLY_TO || undefined;

    await sendEmail({
      to: user.email,
      subject,
      text,
      html,
      from: FROM,
      replyTo: REPLY_TO,
    });

    // در DEV لینک را هم برگردان که راحت تست کنی
    const payload = {
      success: true,
      error: false,
      message: "If the email exists, we sent reset link",
    };
    if (process.env.NODE_ENV !== "production") payload.resetLink = resetLink;

    return res.json(payload);
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: true,
      message: e.message || "Server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body || {};
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Token and newPassword are required",
      });
    }

    const tokenHash = hashToken(token);
    const user = await userModel.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid or expired token",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = "";
    user.resetPasswordExpires = null;

    // اختیاری: باطل‌کردن JWTهای قدیمی
    // user.passwordChangedAt = new Date();

    await user.save();

    return res.json({ success: true, error: false, message: "Password updated" });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: true,
      message: e.message || "Server error",
    });
  }
};










// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");
// const userModel = require("../../models/userModel");
// const { sendEmail } = require("../../utils/email");

// function hashToken(token) {
//   return crypto.createHash("sha256").update(token).digest("hex");
// }

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body || {};
//     if (!email) return res.status(400).json({ success:false, error:true, message:"Email is required" });

//     const user = await userModel.findOne({ email: email.toLowerCase().trim() });
//     // پیام کلی برای امنیت
//     if (!user) return res.json({ success:true, error:false, message:"If the email exists, we sent reset link" });

//     // ساخت توکن و ذخیره‌ی نسخه‌ی هش
//     const token = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = hashToken(token);
//     user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 دقیقه
//     await user.save();

//     // لینک فرانت (از ENV)
//     const base = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
//     const resetLink = `${base}/reset-password?token=${token}`;

//     // ایمیل
//     const subject = "Reset your password";
//     const text = `Use this link to reset your password:\n${resetLink}\nThis link expires in 10 minutes.`;
//     const html = `
//       <p>Click the link below to reset your password (expires in 10 minutes):</p>
//       <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
//     `;
//     const FROM = process.env.MAIL_FROM || process.env.SMTP1_FROM || undefined;

//     await sendEmail({ to: user.email, subject, text, html, from: FROM, replyTo: "support@digimarket.com" });

//     const payload = { success:true, error:false, message:"If the email exists, we sent reset link" };
//     if (process.env.NODE_ENV !== "production") payload.resetLink = resetLink;
//     return res.json(payload);
//   } catch (e) {
//     return res.status(500).json({ success:false, error:true, message:e.message || "Server error" });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body || {};
//     if (!token || !newPassword) {
//       return res.status(400).json({ success:false, error:true, message:"Token and newPassword are required" });
//     }
//     const user = await userModel.findOne({
//       resetPasswordToken: hashToken(token),
//       resetPasswordExpires: { $gt: new Date() },
//     });
//     if (!user) {
//       return res.status(400).json({ success:false, error:true, message:"Invalid or expired token" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetPasswordToken = "";
//     user.resetPasswordExpires = null;
//     await user.save();

//     return res.json({ success:true, error:false, message:"Password updated" });
//   } catch (e) {
//     return res.status(500).json({ success:false, error:true, message:e.message || "Server error" });
//   }
// };





// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");
// const userModel = require("../../models/userModel");
// const { sendEmail } = require("../../utils/email");

// function hashToken(token) {
//   return crypto.createHash("sha256").update(token).digest("hex");
// }

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body || {};
//     if (!email) return res.status(400).json({ success:false, error:true, message:"Email is required" });

//     const user = await userModel.findOne({ email: email.toLowerCase().trim() });
//     if (!user) {
//       // برای امنیت: پیام کلی بده
//       return res.json({ success:true, error:false, message:"If the email exists, we sent reset link" });
//     }

//     // ساخت توکن و ذخیره نسخه hash‌شده
//     const token = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = hashToken(token);
//     user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 دقیقه
//     await user.save();

//     const base = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
//     const resetLink = `${base}/reset-password?token=${token}`;

//     // ارسال ایمیل
//     const subject = "Reset your password";
//     const text = `Use this link to reset your password:\n${resetLink}\nThis link expires in 10 minutes.`;
//     const html = `
//       <p>Click the link below to reset your password (expires in 10 minutes):</p>
//       <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
//     `;

//     await sendEmail({ to: user.email, subject, text, html });
//     const FROM = process.env.MAIL_FROM || process.env.SMTP1_FROM || undefined;
//     await sendEmail({ to: user.email, subject, text, html, from: FROM });
//     // در DEV، لینک را هم برگردان تا راحت تست کنی
//     const payload = { success:true, error:false, message:"If the email exists, we sent reset link" };
//     if (process.env.NODE_ENV !== "production") payload.resetLink = resetLink;

//     return res.json(payload);
//   } catch (e) {
//     return res.status(500).json({ success:false, error:true, message:e.message || "Server error" });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body || {};
//     if (!token || !newPassword) {
//       return res.status(400).json({ success:false, error:true, message:"Token and newPassword are required" });
//     }

//     const tokenHash = hashToken(token);
//     const user = await userModel.findOne({
//       resetPasswordToken: tokenHash,
//       resetPasswordExpires: { $gt: new Date() },
//     });
//     if (!user) {
//       return res.status(400).json({ success:false, error:true, message:"Invalid or expired token" });
//     }

//     const hash = await bcrypt.hash(newPassword, 10);
//     user.password = hash;
//     user.resetPasswordToken = "";
//     user.resetPasswordExpires = null;
//     await user.save();

//     return res.json({ success:true, error:false, message:"Password updated" });
//   } catch (e) {
//     return res.status(500).json({ success:false, error:true, message:e.message || "Server error" });
//   }
// };
