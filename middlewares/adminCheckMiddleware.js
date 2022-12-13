const createError = require("../utils/error");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  const { id } = req.user;
  let user = await User.findById(id);
  if (!user.isAdmin) next(createError(401, "Access denied"));
  next();
};
