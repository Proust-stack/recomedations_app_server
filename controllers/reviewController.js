const Review = require("../models/review");
const Composition = require("../models/composition");
const createError = require("../utils/error");

class ReviewController {
  async getOne(req, res) {
    const review = await Review.findById(req.params.id);
    res.status(200).json(review);
  }
  async getAllOfUser(req, res) {
    const reviews = await Review.find({ userId: req.params.userId });
    res.status(200).json(reviews);
  }
  async createReview(req, res) {
    const newReview = new Review({ userId: req.user.id, ...req.body });
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  }
  async updateReview(req, res) {
    const review = await Review.findById(req.params.id);
    if (req.user.id === review.userId || req.user.isAdmin) {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedReview);
    } else {
      return next(createError(403, "Access denied"));
    }
  }
  async deleteReview(req, res) {
    const review = await Review.findById(req.params.id);
    if (req.user.id === review.userId || req.user.isAdmin) {
      const updatedReview = await Review.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true });
    } else {
      return next(createError(403, "Access denied"));
    }
  }
  async like(req, res, next) {
    await Review.findByIdAndUpdate(req.params.id, {
      $addToSet: { likes: req.user.id },
    });
    res.status(200).json("liked");
  }
  async unLike(req, res, next) {
    await Review.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user.id },
    });
    res.status(200).json("unliked");
  }
}

module.exports = new ReviewController();
