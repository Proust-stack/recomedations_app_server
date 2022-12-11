const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      index: true,
    },
    user: { type: mongoose.ObjectId, ref: "User" },
    review: { type: mongoose.ObjectId, ref: "Review" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
