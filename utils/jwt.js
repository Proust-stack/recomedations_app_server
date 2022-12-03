const jwt = require("jsonwebtoken");

module.expotrs = function (id, isAdmin, blocked) {
  return jwt.sign({ id, isAdmin, blocked }, process.env.SECRET_FOR_JWT, {
    expiresIn: "24h",
  });
};
