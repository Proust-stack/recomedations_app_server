const mongoose = require("mongoose");

const CompositionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  img: [String],
  tags: [{ type: String, index: true }],
  reviews: [{ type: mongoose.ObjectId, ref: "Review" }],
  group: { type: mongoose.ObjectId, ref: "Group" },
  reviewsRating: [{ type: mongoose.ObjectId, ref: "ReviewRating" }],
  usersRating: [{ type: mongoose.ObjectId, ref: "UserRating" }],
});

module.exports = mongoose.model("Composition", CompositionSchema);
