const createError = require("../utils/error");

module.exports = function (req, res, next) {
  const { admin } = req.user;
  if (req.method === "OPTIONS") {
    next();
  }
  if (!admin) next(createError(401, "Access denied"));
  next();
};
