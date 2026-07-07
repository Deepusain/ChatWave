const jwt = require("jsonwebtoken");

// Protects a route: only lets the request through if it carries a
// valid JWT (sent as "Authorization: Bearer <token>").
// On success it attaches the decoded user id to req.userId so
// controllers can use it.
module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ status: false, msg: "No token provided, access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, msg: "Invalid or expired token." });
  }
};
