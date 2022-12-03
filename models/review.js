const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    img: [String],
    comments: [{ String, ref: "Comment" }],
    userId: { String, ref: "User", required: true },
    compositionId: {
      type: String,
      ref: "Composition",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
