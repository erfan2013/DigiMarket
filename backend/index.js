const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();

// لازم برای کوکی Secure پشت پراکسی (Render/Vercel)
app.set("trust proxy", 1);

// میدل‌ورها
app.use(express.json());
app.use(cookieParser());

// مبداهای مجاز را از ENV (Comma-separated) بخوان
// مثال در .env:
// FRONT_END_URLS="https://digi-market-zeta.vercel.app,http://localhost:3000"
const allowedOrigins = (process.env.FRONT_END_URLS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight
app.options("*", cors());

// health check (برای تست سریع)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API
app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});





// const express = require("express")
// const cors = require("cors")
// require("dotenv").config()
// const connectDB = require("./config/db")
// const router = require("./routes/index")
// const cookieParser = require("cookie-parser")



// const app = express()

// app.use(cors({
//     origin : process.env.FRONT_END_URL,
//     credentials : true
// }))
// app.use(express.json())
// app.use(cookieParser())
// const allowedOrigins = [
//   process.env.FRONT_END_URL,     // مثلا https://digi-market-zeta.vercel.app
//   'http://localhost:3000'        // برای توسعه لوکال
// ].filter(Boolean);
// app.use(cors({
//   origin(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
// }));
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "ok" });
// });
// app.use("/api", router)

// const PORT = process.env.PORT || 8080


// connectDB().then(() => {
//     app.listen(PORT,() => {
//         console.log(`Server is running on port ${PORT}`)
//         console.log("Server is running")
//     })
// })
