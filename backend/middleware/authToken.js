const jwt = require('jsonwebtoken');


async function authToken(req, res, next) {
    try{
        const token = req.cookies?.token || req.headers
        jwt.verify(token, process.env.TOKEN_SECRET_KEY,function(err,decoded){
            console.log("decoded",decoded)
            console.log("err",err)
        });
      
    }catch(error){
        res.status(401).json({ message: error.message || error , error: true , success: false , data: []});
    }
}

module.exports = authToken;