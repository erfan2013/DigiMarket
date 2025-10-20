const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const bearer = req.headers.authorization;
    const headerToken = bearer && bearer.startsWith("Bearer ") ? bearer.slice(7) : null;
    const cookieToken = req.cookies?.token;
    const token = headerToken || cookieToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", error: true, success: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userId = decoded?._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: true, success: false });
  }
}

module.exports = authToken;

