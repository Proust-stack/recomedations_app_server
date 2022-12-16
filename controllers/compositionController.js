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
  async getAllByGroup(req, res) {
    const compositions = await Composition.find({
      group: req.params.id,
    });
    res.status(200).json(compositions);
  }
  async getAllCompositions(req, res) {
    const compositions = await Composition.find({});
    res.status(200).json(compositions);
  }
  async getOne(req, res) {
    const composition = await Composition.findById(req.params.id);
    res.status(200).json(composition);
  }
}

module.exports = new CompositionController();
