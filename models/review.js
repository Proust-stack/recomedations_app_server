const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema(
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

// ReviewSchema.pre("aggregate", function (docs) {
//   mongoose.model("Review", ReviewSchema).find().populate("comments");
// });

module.exports = mongoose.model("Review", ReviewSchema);
