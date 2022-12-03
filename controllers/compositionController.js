const Composition = require("../models/composition");
const createError = require("../utils/error");

class CompositionController {
  async create(req, res) {
    const composition = new Composition({ ...req.body });
    await composition.save();
    res.status(200).json(composition);
  }
}

module.exports = new CompositionController();
