const mongoose = require("mongoose");

const CompositionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: [String],
  tags: [{ String, ref: "Tag" }],
  reviewIds: [{ type: String, ref: "Review" }],
  reviewRating: [Number],
  userRating: [Number],
});

module.exports = mongoose.model("Composition", CompositionSchema);
