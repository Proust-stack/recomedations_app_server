const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    userId: { type: String, ref: "User", required: true },
    reviewId: {
      type: String,
      ref: "Review",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
