const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    userId: { type: String, required: true },
    reviewId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
