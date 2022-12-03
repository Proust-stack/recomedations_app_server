const mongoose = require("mongoose");

const CompositionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: [String],
  tags: [{ String, ref: "Tag" }],
  reviewIds: [{ type: String, ref: "Review" }],
  groupId: { type: String, ref: "Group" },
  reviewRating: [Number],
  userRating: [Number],
});

module.exports = mongoose.model("Composition", CompositionSchema);
