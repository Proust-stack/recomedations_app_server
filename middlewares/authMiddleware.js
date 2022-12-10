const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  const token = req.cookies.access_token;
  console.log(token);
  //const token = req.headers.authorization.split(" ")[1];
  // if (!req.body.review.user)
  //   next(createError(401, "You are not authenticated!"));
  next();

  // jwt.verify(token, process.env.SECRET_FOR_JWT, (err, user) => {
  //   if (err) next(createError(403, "Token is not valid!"));
  //   req.user = user;
  //   next();
  // });
};
