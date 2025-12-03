const jwt = require("jsonwebtoken");
const myusers = require("../models/userModel"); 
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token nahi mila. Kripya login karein." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await myusers.findById(decoded.userId).select("-password");

    if (req.user) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "user not found in databse" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({
      message: "token invalid OR expire",
    });
  }
};

module.exports = { protect };
