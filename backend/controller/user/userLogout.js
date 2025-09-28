const isProd = process.env.NODE_ENV === 'production';

async function userLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      message: "User Logout Successfully",
      success: true,
      error: false,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Logout failed",
      success: false,
      error: true,
    });
  }
}

module.exports = userLogout;









// async function userLogout(req, res) {
//     try {
//         res.clearCookie("token");
//         res.clearCookie("token", {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//             path: "/",
//         });
//         res.json({ 
//             message: "User Logged Out",
//             error: false,
//             success: true,
//             data: []
//         });
//     } catch (error) {
//         res.json({ 
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }
// module.exports = userLogout;
























// async function userLogout(req, res) {
//     try {
//         res.clearCookie("token");
//         res.json({ 
//             message: "User Logged Out",
//              error: false,
//               success: true ,
//               data : [],
//             });
//     } catch (error) {
//         res.json({ 
//             message: error.message || error ,
//              error: true ,
//               success: false,
//             });
//     }
// }

// module.exports = userLogout;