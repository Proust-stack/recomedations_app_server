const jwt = require("jsonwebtoken");
const User = require("../models/user");
const createError = require("../utils/error");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  const token = req.cookies.access_token;
  const data = jwt.verify(token, process.env.SECRET_FOR_JWT, (err, user) => {
    if (err) next(createError(403, "Token is not valid!"));
    return user;
  });
  const { id } = data;
  console.log(id);
  const user = await User.findById(id);
  console.log(user);
  if (user.blocked) next(createError(401, "Access denied"));
  req.user = user;
  next();
};
