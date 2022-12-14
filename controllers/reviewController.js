const Review = require("../models/review");
const Composition = require("../models/composition");
const createError = require("../utils/error");

class ReviewController {
  async getOne(req, res) {
    const review = await Review.findById(req.params.id);
    res.status(200).json(review);
  }
  async getAll(req, res) {
    const reviews = await Review.find({})
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
        .populate("user")
        .populate("composition")
        .limit(20)
        .exec();
    } else {
      reviews = await Review.find({})
        .populate("user")
        .populate("composition")
        .exec();
    }

    res.status(200).json(reviews);
  }
  async getAllOfUser(req, res) {
    const reviews = await Review.find({ user: req.params.id });
    res.status(200).json(reviews);
  }
  async getAllOfComposition(req, res) {
    const reviews = await Review.find({ composition: req.params.id });
    res.status(200).json(reviews);
  }
  async search(req, res) {
    const reviews = await Review.aggregate().search({
      text: {
        query: req.query.q,
        path: ["text", "comments"],
      },
    });
    res.status(200).json(reviews);
  }
  async createReview(req, res) {
    console.log(req.body);

    await Composition.findByIdAndUpdate(req.body._id, {
      $push: { tags: req.body.tags },
    });
    const newReview = new Review({ ...req.body });
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
