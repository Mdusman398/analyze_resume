const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
const oneHourInMs = 60 * 60 * 1000;
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development" ? true : false,
    sameSite: "strict",
    maxAge: oneHourInMs,
    path: "/",
  });
};

module.exports = generateToken;
