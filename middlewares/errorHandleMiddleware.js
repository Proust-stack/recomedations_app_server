module.exports = function (err, req, res, next) {
  return res
    .status(err.status)
    .json({ success: false, message: err.message || "Some error occured" });
};
