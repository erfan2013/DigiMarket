const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    // 1) توکن را از کوکی یا هدر بخوان
    const bearer = req.headers.authorization;
    const headerToken = bearer && bearer.startsWith('Bearer ')
      ? bearer.slice(7)        // حذف "Bearer "
      : null;

    const token = req.cookies?.token || headerToken;
    console.log('authToken → token:', token ? '[present]' : '[missing]');

    // 2) اگر نبود، 401 بده (نه 200)
    if (!token) {
      return res.status(401).json({
        message: 'Please Login...!',
        error: true,
        success: false,
      });
    }

    // 3) اعتبارسنجی JWT
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log('authToken → verify err:', err?.message);
        return res.status(401).json({
          message: 'Invalid or expired token',
          error: true,
          success: false,
        });
      }

      // 4) تزریق userId و ادامه
      req.userId = decoded?._id;
      return next();
    });

  } catch (error) {
    console.log('authToken → catch:', error?.message);
    return res.status(400).json({
      message: error.message || 'Auth error',
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;













// const jwt = require('jsonwebtoken');


// async function authToken(req, res, next) {
//     try{
//         const token = req.cookies?.token 
//         console.log("token",token)

//         if(!token){
//             return res.status(200).json({
//                 message: 'Please Login...!' ,
//                 error: true , 
//                 success: false

//             })
//         }

//         jwt.verify(token, process.env.TOKEN_SECRET_KEY,function(err,decoded){
//             console.log("decoded",decoded)
//             console.log("err",err)

//             if(err){
//                 console.log("err",err)
//             }

//             req.userId = decoded?._id

//             next()
//         });
      
//     }catch(error){
//         res.status(400).json({ 
//             message: error.message || error,
//             data: [],
//             error: true ,
//             success: false});
//     }
// }

// module.exports = authToken;