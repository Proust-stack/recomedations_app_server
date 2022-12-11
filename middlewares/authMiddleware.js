const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  const token = req.cookies.access_token;
  jwt.verify(token, process.env.SECRET_FOR_JWT, (err, user) => {
    if (err) next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
