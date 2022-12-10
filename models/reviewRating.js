const mongoose = require("mongoose");

const ReviewRatingSchema = mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  reviewEstimation: {
    type: Number,
    min: [0, "From 0 to 10 required"],
    max: 10,
  },
});

module.exports = mongoose.model("ReviewRating", ReviewRatingSchema);
