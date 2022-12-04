const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    body: {
      type: String,
      required: true,
      index: true,
    },
    img: [String],
    comments: [{ type: String, index: true }],
    userId: { type: String, required: true },
    likes: [String],
    compositionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
