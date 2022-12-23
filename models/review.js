const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    img: [String],
    tags: [{ type: String, unique: true }],
    comments: [{ type: mongoose.ObjectId, ref: "Comment" }],
    user: { type: mongoose.ObjectId, ref: "User" },
    likes: [{ type: mongoose.ObjectId, ref: "User" }],
    composition: { type: mongoose.ObjectId, ref: "Composition" },
    text: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
