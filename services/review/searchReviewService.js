const Review = require("../../models/review");
const Comment = require("../../models/comment");

const searchReview = async (query) => {
  const reviews = await Review.aggregate([
    {
      $search: {
        text: {
          query,
          path: ["markdown", "comments.text", "title"],
          // fuzzy: {
          //   maxEdits: 1,
          // },
        },
        highlight: {
          path: "markdown",
        },
      },
    },
  ]);
  return reviews;
};
const searchComments = async (query) => {
  let comments = await Comment.aggregate([
    {
      $search: {
        index: "comment",
        text: {
          query,
          path: ["text"],
          // fuzzy: {
          //   maxEdits: 1,
          // },
        },
      },
    },
    {
      $lookup: {
        from: Review.collection.name,
        localField: "review",
        foreignField: "_id",
        as: "review",
      },
    },
    { $unwind: "$review" },
  ]);
  return comments;
};

module.exports = {
  searchReview,
  searchComments,
};
