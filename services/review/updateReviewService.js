const ReviewRating = require("../../models/reviewRating");
const Composition = require("../../models/composition");
const Review = require("../../models/review");

const updateReviewRating = async (reviewsRatingId, reviewRating) => {
  const savedReviewRating = await ReviewRating.findByIdAndUpdate(
    reviewsRatingId,
    {
      reviewEstimation: reviewRating,
    },
    { new: true }
  );
  return savedReviewRating;
};

// const updateComposition = async (compositionId) => {
//   await Composition.findByIdAndUpdate(compositionId, {
//     reviewsRating: reviewRatingId,
//   });
// };

const updateReview = async (reviewId, tags, title, markdown) => {
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      tags,
      title,
      markdown,
    },
    { new: true }
  );
  return updatedReview;
};

module.exports = {
  updateReviewRating,
  updateReview,
};
