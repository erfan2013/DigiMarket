const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const isProd = process.env.NODE_ENV === 'production';

async function userSigninController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error("Please Provide Email");
    if (!password) throw new Error("Please Provide Password");

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("checked", passwordMatch);

    if (!passwordMatch) throw new Error("Password is not correct");

    const tokenData = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

    const cookieOptions = {
      httpOnly: true,
      secure: isProd,                     // فقط روی پروداکشن
      sameSite: isProd ? "none" : "lax",  // روی لوکال = lax
      path: "/",
    };

    res.cookie("token", token, cookieOptions).status(200).json({
      message: "User Signin Successfully",
      data: token,
      success: true,
      error: false,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = userSigninController;










// const bcrypt = require('bcryptjs');
// const userModel = require('../../models/userModel');
// const jwt = require('jsonwebtoken');
// const isProd = process.env.NODE_ENV === 'production';

// async function userSigninController(req, res) {
//     try{
//         const {email,password} = req.body

//         if(!email){
//             throw new Error("Please Provide Email")
//         }
//         if(!password){
//             throw new Error("Please Provide Password")
//         }

//         const user = await userModel.findOne({email})

//         if(!user){
//             throw new Error("User not found")
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         console.log("checked" ,passwordMatch)

//         if(passwordMatch){

//             const tokenData = {
//                 _id : user._id,
//                 email : user.email,
//             }

//             const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60*60*8 });
//             const tokenoption = {
//                 httpOnly : true,
//                 secure : true,
//                 sameSite : "none",
//                 path : "/",
//             }
//             const tokenoption = {
//             httpOnly: true,
//             secure: isProd,                 // فقط روی پروداکشن
//             sameSite: isProd ? 'none' : 'lax',
//             path: '/',
//             };
//             res.cookie("token", token , tokenoption).status(200).json({
//                 message : "User Signin Successfully",
//                 data : token,
//                 success : true,
//                 error : false,


//             }
//             )
//         }else{
//             throw new Error("Password is not correct")

//         }
//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             success : false,
//             error : true,
//         })
//     }
// }

// module.exports = userSigninController
