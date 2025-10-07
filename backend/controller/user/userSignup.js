const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const { isValidPhoneNumber, parsePhoneNumberFromString } = require("libphonenumber-js");

function normalizePhone(phone) {
  if (!phone) return { e164: "", countryCode: "" };
  try {
    const p = parsePhoneNumberFromString(phone);
    if (!p || !p.isValid()) return { e164: "", countryCode: "" };
    return { e164: p.number, countryCode: `+${p.countryCallingCode}` };
  } catch {
    return { e164: "", countryCode: "" };
  }
}

async function userSignupController(req, res) {
  try {
    const {
      firstName = "",
      lastName = "",
      email = "",
      name = "", // برای سازگاری
      password = "",
      profilePic = "",
      phone = "",
      address = ""
    } = req.body || {};

    if (!name.trim()) throw new Error("Please provide name");
    if (!firstName.trim()) throw new Error("Please provide first name");
    if (!lastName.trim()) throw new Error("Please provide last name");
    if (!email.trim()) throw new Error("Please provide email");
    if (!password) throw new Error("Please provide password");

    const existed = await userModel.findOne({ email: email.toLowerCase().trim() });
    if (existed) throw new Error("Email already exists");

    // Phone validation (optional but recommended)
    let phoneE164 = "";
    let countryCode = "";
    if (phone) {
      if (!isValidPhoneNumber(phone)) {
        return res.status(400).json({ success: false, error: true, message: "Invalid phone number" });
      }
      const norm = normalizePhone(phone);
      phoneE164 = norm.e164;
      countryCode = norm.countryCode;
    }

    const hash = await bcrypt.hash(password, 10);

    const doc = await userModel.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name     : `${firstName.trim()} ${lastName.trim()}`, // برای سازگاری
      email: email.toLowerCase().trim(),
      password: hash,
      profilePic,            // اگر می‌خوای ذخیره‌اش کنی
      phone: phoneE164,      // مثل +98912...
      countryCode,           // +98
      address: address.trim(),
      role: "USER",
      avatar: "",            // خالی تا وقتی کاربر آپلود کنه
    });

    return res.json({
      success: true,
      error: false,
      message: "User created successfully",
      data: { _id: doc._id, email: doc.email }
    });
  } catch (err) {
    res.json({
      success: false,
      error: true,
      message: err.message || String(err),
    });
  }
}

module.exports = userSignupController;








// const userModel = require("../../models/userModel")
// const bcrypt = require('bcryptjs');

// async function userSignupController(req,res){
//   try{
//     const { name, email, password, phone = "", address = "", countryCode = "" } = req.body;

//     if(!email) throw new Error("Please Provide Email");
//     if(!password) throw new Error("Please Provide Password");
//     if(!name) throw new Error("Please Provide Name");

//     const existed = await userModel.findOne({ email });
//     if (existed) throw new Error("email already exists");

//     const hash = await bcrypt.hash(password, 10);

//     const doc = await userModel.create({
//       name,
//       email,
//       password: hash,
//       phone,
//       address,
//       countryCode,
//       role: "USER",
//       avatar: "",           // یا خالی
//       profilePic: "",       // اگر هنوز جای دیگه می‌خونی
//     });

//     return res.json({
//       success: true,
//       error: false,
//       message: "User Created Successfully",
//       data: { _id: doc._id, email: doc.email }
//     });
//   }
//   catch(err){
//     res.json({
//       success: false,
//       error: true,
//       message: err.message || err,
//     });
//   }
// }
// module.exports = userSignupController






// const userModel = require("../../models/userModel")
// var bcrypt = require('bcryptjs');


// async function userSignupController(req,res){
//     try{
//         const {name,email,password, phone = "", address = "",countryCode = ""} = req.body

//         const user = await userModel.findOne({email})
//         if(user){
//             throw new Error("email already exists")
//             }

//         if(!email){
//             throw new Error("Please Provide Email")
//         }
//         if(!name){
//             throw new Error("Please Provide Name")
//         }
//         if(!password){
//             throw new Error("Please Provide Password")
//         }
//         const salt = bcrypt.genSaltSync(10);
//         const hashPasword = await bcrypt.hashSync(password, salt);


//         if(!hashPasword){
//             throw new Error("Password is not hashed")
//         }

//         const payload = {
//             ...req.body,
//             role : "GENERAL",
//             password : hashPasword

//         }

//         const userData = new userModel(payload)
//         const saveUser = await userData.save()

//         res.status(201).json({
//             data : saveUser,
//             success : true,
//             error : false,
//             message: "User Created Successfully",
//         })
//     }
//     catch(err){
//         res.json({
//             message: err.message || err ,
//             error : true,
//             success : false,
//         })
        
//     }
// }
// module.exports = userSignupController