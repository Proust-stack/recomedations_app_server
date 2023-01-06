const createError = require("../utils/error");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  if (!req.user.isAdmin) next(createError(401, "Access denied"));
  next();
};
