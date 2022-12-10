const mongoose = require("mongoose");
const { marked } = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

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
    tags: [{ type: String, index: true }],
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

ReviewSchema.pre("validate", function (next) {
  if (this.markdown) {
    this.text = dompurify.sanitize(marked(this.markdown));
  }

  next();
});

module.exports = mongoose.model("Review", ReviewSchema);
