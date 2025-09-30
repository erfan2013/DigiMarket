const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes/index");

const app = express();

// پشت پراکسی/کلودفلر/رندر
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

// اجازه‌دادن به مبداهای تولید و لوکال (ENV روی Render: FRONT_END_URLS="https://digi-market-zeta.vercel.app,http://localhost:3000")
const allowedOrigins = (process.env.FRONT_END_URLS || "").split(",").map(s => s.trim()).filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // مثل Postman
    return cb(null, allowedOrigins.includes(origin));
  },
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","Cache-Control","X-Requested-With"],
  exposedHeaders: ["Set-Cookie"]
};

// حتماً preflight را هم پاسخ بده
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/api", router);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on :${PORT}`);
  });
});









// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const router = require("./routes/index");
// const cookieParser = require("cookie-parser");

// const app = express();

// // پشت پراکسی/کلودفلر/رندر
// app.set("trust proxy", 1);

// // میدلورها
// app.use(express.json());
// app.use(cookieParser());

// // CORS فقط یک‌بار با allowlist
// const allowedOrigins = (process.env.FRONT_END_URLS || "")
//   .split(",")
//   .map(s => s.trim())
//   .filter(Boolean); // ['https://digi-market-zeta.vercel.app','http://localhost:3000']

// app.use(cors({
//   origin(origin, cb) {
//     if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//     return cb(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
//   methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"],
// }));
// app.options("*", cors());

// // (اختیاری) هلس‌چک
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "ok" });
// });

// // روت‌ها
// app.use("/api", router);

// const PORT = process.env.PORT || 8080;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("NODE_ENV =", JSON.stringify(process.env.NODE_ENV));
//     console.log(`Server is running on port ${PORT}`);
//   });
// });


// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const router = require("./routes/index");
// const cookieParser = require("cookie-parser");

// const app = express();

// // 1) حتماً برای HTTPS پشت پراکسی (Render)
// app.set("trust proxy", 1);

// // 2) میدلورها
// app.use(express.json());
// app.use(cookieParser());

// // 3) CORS: هر دو مبدا (Vercel + لوکال) مجاز باشند
// // Render → Environment: FRONT_END_URLS="https://digi-market-zeta.vercel.app,http://localhost:3000"
// const allowedOrigins = (process.env.FRONT_END_URLS || "")
//   .split(",")
//   .map(s => s.trim())
//   .filter(Boolean);

// app.use(cors({
//   origin(origin, cb) {
//     if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//     return cb(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
//   methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"],
// }));

// // preflight برای برخی مرورگرها حیاتی است
// app.options("*", cors());

// // (اختیاری) هِلث
// app.get("/health", (req,res)=>res.status(200).json({status:"ok"}));

// // روتر اصلی
// app.use("/api", router);

// const PORT = process.env.PORT || 8080;
// connectDB().then(()=>{
//   app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
//   console.log("Server is running");
// });











// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const router = require("./routes/index");
// const cookieParser = require("cookie-parser");

// const app = express();

// // لازم برای کوکی Secure پشت پراکسی (Render/Vercel)
// app.set("trust proxy", 1);

// // میدل‌ورها
// app.use(express.json());
// app.use(cookieParser());

// // مبداهای مجاز را از ENV (Comma-separated) بخوان
// // مثال در .env:
// // FRONT_END_URLS="https://digi-market-zeta.vercel.app,http://localhost:3000"
// const allowedOrigins = (process.env.FRONT_END_URLS || "")
//   .split(",")
//   .map(s => s.trim())
//   .filter(Boolean);

// app.use(
//   cors({
//     origin(origin, cb) {
//       if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//       return cb(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // preflight
// app.options("*", cors());

// // health check (برای تست سریع)
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "ok" });
// });

// // API
// app.use("/api", router);

// const PORT = process.env.PORT || 8080;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });





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
