const mongoose = require("mongoose")


const userScheme = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    name: { type: String, default: "" }, 
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
userScheme.pre("save", function (next) {
  const full = [this.firstName, this.lastName].filter(Boolean).join(" ").trim();
  if (full) this.name = full;
  next();
});

// خروجی JSON: fullName کمکی
userScheme.set("toJSON", { virtuals: true });
userScheme.virtual("fullName").get(function () {
  return [this.firstName, this.lastName].filter(Boolean).join(" ").trim();
});

const userModel = mongoose.model("user",userScheme)

module.exports = userModel