const Composition = require("../models/composition");
const UserRating = require("../models/userRating");
const createError = require("../utils/error");

class CompositionController {
  async create(req, res) {
    const composition = new Composition({ ...req.body });
    await composition.save();
    res.status(200).json(composition);
  }
  async setUserRating(req, res) {
    const userRating = new UserRating({
      user: req.user.id,
      userEstimation: req.body.userRating,
    });
    const savedUserRating = await userRating.save();
    await Composition.findByIdAndUpdate(req.params.id, {
      $push: { usersRating: savedUserRating._id },
    });
    res.status(200).json(savedUserRating);
  }

  async getByTags(req, res) {
    const searchTags = req.query.tags.split(",");
    const compositions = await Composition.find({
      tags: { $in: searchTags },
    }).limit(10);
    res.status(200).json(compositions);
  }
  async getAllByGroup(req, res) {
    const compositions = await Composition.find({
      group: req.params.id,
    })
      .populate("reviewsRating")
      .populate("usersRating")
      .limit(20);
    res.status(200).json(compositions);
  }
  async getAllCompositions(req, res) {
    const compositions = await Composition.find({})
      .sort("title")
      .limit(30)
      .exec();
    res.status(200).json(compositions);
  }
  async getOne(req, res) {
    if (!req.params.id) {
      res.status(204).json("not found");
    }
    const composition = await Composition.findById(req.params.id)
      .populate("group")
      .populate("reviewsRating")
      .populate("usersRating")
      .exec();
    res.status(200).json(composition);
  }
}

module.exports = new CompositionController();
