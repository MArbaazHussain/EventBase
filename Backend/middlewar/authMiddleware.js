const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");

    // ✅ SAME KEY AS auth.js
    const decoded = jwt.verify(token, "secretkey123");

    req.user = decoded; // { id, email }
    next();

  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
