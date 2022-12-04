const mongoose = require("mongoose");

const CompositionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: [String],
  tags: [{ type: String, index: true }],
  reviewIds: [String],
  groupId: String,
  reviewRating: [Number],
  userRating: [Number],
});

module.exports = mongoose.model("Composition", CompositionSchema);
