const Review = require("../../models/review");

const updateReview = async (reviewId, tags, title, markdown, img) => {
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      tags,
      title,
      markdown,
      $push: { img },
    },
    { new: true }
  );
  return updatedReview;
};

module.exports = {
  updateReview,
};
