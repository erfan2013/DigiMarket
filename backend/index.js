const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/upload.routes");
const router = require("./routes/index");     // ← فقط یک روتر نهایی
const sliderRoutes = require("./routes/slider.routes");
// یا اگر همه‌چیز در user.js است: const router = require("./routes/user");
const path = require("path");

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

// ---------- CORS (حتماً قبل از /api) ----------
const allowedOrigins = (process.env.FRONT_END_URLS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean); // e.g. "http://localhost:3000,https://digi-market-zeta.vercel.app"

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);                 // Postman/server-to-server
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"], // ← PATCH حتماً هست
  allowedHeaders: ["Content-Type","Authorization","Cache-Control","X-Requested-With"],
  exposedHeaders: ["Set-Cookie"],
};

// preflight برای همه مسیرها
app.options("*", cors(corsOptions));
// CORS اصلی
app.use(cors(corsOptions));


app.use("/api", uploadRoutes);

// ---------- health ----------
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// ---------- API (فقط یک بار) ----------
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", sliderRoutes);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on :${PORT}`));
  console.log("server is connected");
});