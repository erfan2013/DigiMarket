// backend/controller/user/allUsers.js
const User = require("../../models/userModel");
const uploadProductPermisson = require("../../helpers/Permisson"); // همون چک ADMIN شما

// یه فانکشن کوچیک برای escape کردن regex
function escapeRegex(s = "") {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = async function allUsers(req, res) {
  try {
    // فقط ادمین اجازه داره
    if (!uploadProductPermisson(req.userId)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const q = (req.query.q || "").trim();
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 100);
    const skip = (page - 1) * limit;

    let filter = {};
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter = { $or: [{firstName: rx}, { lastName: rx }, {name: rx}, { email: rx }] };
    }

    // فیلدهایی که لازم داریم
    const projection = {
      firstName: 1,
      lastName: 1,
      email: 1,
      role: 1,
      createdAt: 1,
      avatar: 1,
      profilePic: 1,
    };

    const [items, total] = await Promise.all([
      User.find(filter, projection).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: items,
      page,
      limit,
      total,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};






// const userModel = require("../../models/userModel");

// async function allUsers(req, res) {
//   try {
//     console.log("user",req.userId)


//     const allUsers = await userModel.find(res.userId);
//     res.json({
//       message: "All Users",
//       data : allUsers,
//       success: true,
//       error: false,   
//     });
     
//     }catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error : true,
//             success: false,
//     });
//   }
// }

// module.exports = allUsers;