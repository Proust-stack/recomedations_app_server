const Composition = require("../models/composition");
const createError = require("../utils/error");

class CompositionController {
  async create(req, res) {
    const composition = new Composition({ ...req.body });
    await composition.save();
    res.status(200).json(composition);
  }
  async getByTags(req, res) {
    const searchTags = req.query.tags.split(",");
    const compositions = await Composition.find({
      tags: { $in: searchTags },
    }).limit(10);
    res.status(200).json(compositions);
  }
}

module.exports = new CompositionController();
