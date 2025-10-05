const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

async function sendEmail({ to, subject, html, text }) {
  // DEV fallback: اگر SMTP ست نباشه، لاگ کن که گیر نکنی
  if (!process.env.SMTP_USER) {
    console.log("[DEV EMAIL]", { to, subject, text, html });
    return;
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}

module.exports = sendEmail;
