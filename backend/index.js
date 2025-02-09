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


app.use("/api", router)

const PORT = 8080 || process.env.PORT


connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
        console.log("Server is running")
    })
})
