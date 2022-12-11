const Review = require("../models/review");
const Composition = require("../models/composition");
const createError = require("../utils/error");

class TagController {
  async getAll(req, res) {
    const reviews = await Review.find({}).select("tags").exec();
    res.status(200).json(reviews);
  }
  async getOne(req, res) {
    // const reviews = await Review.find({}, "tags").exec();
    // res.status(200).json(reviews);
  }
}

module.exports = new TagController();
