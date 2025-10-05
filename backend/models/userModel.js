const mongoose = require("mongoose")


const userScheme = new mongoose.Schema({
    name : String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password : String,
    profilePic : String,
    role: { type: String, enum: ["ADMIN","USER"], default: "USER" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    avatar: { type: String, default: "" },
    countryCode: { type: String, default: "" }, // +98 (اختیاری)
    resetPasswordToken: { type: String, default: "" },
    resetPasswordExpires: { type: Date, default: null },



},{
    timestamps: true,
})

const userModel = mongoose.model("user",userScheme)

module.exports = userModel