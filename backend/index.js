const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const router = require("./routes/index")
const cookieParser = require("cookie-parser")



const app = express()

app.use(cors({
    origin : process.env.FRONT_END_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  process.env.FRONT_END_URL,     // مثلا https://digi-market-zeta.vercel.app
  'http://localhost:3000'        // برای توسعه لوکال
].filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api", router)

const PORT = process.env.PORT || 8080


connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
        console.log("Server is running")
    })
})
