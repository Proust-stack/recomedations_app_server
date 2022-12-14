const Review = require("../models/review");
const Composition = require("../models/composition");
const createError = require("../utils/error");

class TagController {
  async getAll(req, res) {
    const reviews = await Review.find({}).select("tags").limit(20).exec();
    res.status(200).json(reviews);
  }
  async getAllByGroup(req, res) {
    const tags = req.query.id;
    const reviews = await Review.find({}).select("tags").limit(20).exec();
    res.status(200).json(reviews);
  }
  async getOne(req, res) {
    // const reviews = await Review.find({}, "tags").exec();
    // res.status(200).json(reviews);
  }
}

module.exports = new TagController();
