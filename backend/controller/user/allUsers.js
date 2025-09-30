const userModel = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    const users = await userModel.find({}, "-password -__v");
    return res.json({
      message: "All Users",
      data: users,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;





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