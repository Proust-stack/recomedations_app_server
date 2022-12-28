const ReviewRating = require("../../models/reviewRating");
const Composition = require("../../models/composition");

const createReviewRating = async (userId, reviewEstimation) => {
  const reviewRating = new ReviewRating({
    user: userId,
    reviewEstimation,
  });
  const savedReviewRating = await reviewRating.save();
  return savedReviewRating;
};

const addDataToComposition = async (compositionId, tags, reviewRatingId) => {
  await Composition.findByIdAndUpdate(compositionId, {
    $push: { tags },
    $push: { reviewsRating: reviewRatingId },
  });
};

module.exports = {
  createReviewRating,
  addDataToComposition,
};
