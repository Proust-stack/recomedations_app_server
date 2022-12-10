const mongoose = require("mongoose");

const UserRatingSchema = mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  userEstimation: { type: Number, min: [0, "From 0 to 5 required"], max: 5 },
});

module.exports = mongoose.model("UserRating", UserRatingSchema);
