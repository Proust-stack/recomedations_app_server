const Review = require("../models/review");
const User = require("../models/user");
const Comment = require("../models/comment");
const Composition = require("../models/composition");
const ReviewRating = require("../models/reviewRating");
const createError = require("../utils/error");
const {
  updateReviewRating,
  updateReview,
} = require("../services/review/updateReviewService");
const {
  createReviewRating,
  addDataToComposition,
} = require("../services/review/createReviewService");

class ReviewController {
  async getOne(req, res) {
    const review = await Review.findById(req.params.id)
      .populate("composition")
      .exec();
    res.status(200).json(review);
  }
  async getAll(req, res) {
    const reviews = await Review.find({})
      .sort({ updatedAt: -1 })
      .limit(20)
      .populate("user")
      .populate("composition")
      .exec();
    res.status(200).json(reviews);
  }
  async getByTags(req, res, next) {
    const tags = req.query.tags;
    let reviews;
    if (tags?.length) {
      reviews = await Review.find({ tags: { $in: tags } })
        .sort("-createdAt")
        .limit(20)
        .populate("user")
        .populate("composition")
        .exec();
    } else {
      reviews = await Review.find({})
        .sort("-createdAt")
        .limit(20)
        .populate("user")
        .populate("composition")
        .exec();
    }

    res.status(200).json(reviews);
  }
  async getAllOfUser(req, res) {
    const reviews = await Review.find({ user: req.params.id })
      .populate("composition")
      .exec();
    res.status(200).json(reviews);
  }
  async getAllOfComposition(req, res) {
    const reviews = await Review.find({ composition: req.params.id })
      .sort("-createdAt")
      .limit(20)
      .exec();
    res.status(200).json(reviews);
  }
  async search(req, res) {
    const reviews = await Review.find({
      $search: {
        index: "default",
        text: {
          query: req.query.q,
          path: {
            wildcard: "*",
          },
        },
      },
    })
      .populate("comments")
      .populate("markdown")
      .exec();
    // .find({
    //   $default: {
    //     $search: {
    //       text: {
    //         query: req.query.q,
    //         path: ["text", "comments"],
    //       },
    //     },
    //   },
    // });

    // const reviews = await Review.aggregate([
    //   {
    //     $search: {
    //       text: {
    //         query: req.query.q,
    //         path: ["markdown", "comments"],
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: Review.collection.name,
    //       localField: "comments",
    //       foreignField: "text",
    //       as: "comments",
    //     },
    //   },
    // ]);
    res.status(200).json(reviews);
  }
  async createReview(req, res) {
    const savedReviewRating = await createReviewRating(
      req.user.id,
      req.body.reviewRating
    );
    await addDataToComposition(
      req.body.composition,
      req.body.tags,
      savedReviewRating._id
    );
    const newReview = new Review({ ...req.body });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  }
  async updateReview(req, res, next) {
    if (req.user.id === req.body.user || req.user.isAdmin) {
      const savedReviewRating = await updateReviewRating(
        req.body.reviewsRatingId,
        req.body.reviewRating
      );
      // await updateComposition(req.body.composition);

      const updatedReview = await updateReview(
        req.params.id,
        req.body.tags,
        req.body.title,
        req.body.markdown
      );
      res.status(200).json(updatedReview);
    } else {
      return next(createError(403, "Access denied"));
    }
  }
  async deleteReview(req, res) {
    const review = await Review.findById(req.body.reviews[0]);
    const user = await User.findById(req.user.id);
    if (req.user.id === review.user || user.isAdmin) {
      await Review.deleteMany({ _id: { $in: req.body.reviews } });
      res.status(200).json({ success: true });
    } else {
      return next(createError(403, "Access denied"));
    }
  }
  async like(req, res, next) {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user.id },
      },
      { new: true }
    );
    res.status(200).json(review);
  }
  async unLike(req, res, next) {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user.id },
      },
      { new: true }
    );
    res.status(200).json(review);
  }
}

module.exports = new ReviewController();
