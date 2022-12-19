const Group = require("../models/group");
const createError = require("../utils/error");

class GroupController {
  async getAll(req, res, next) {
    const groups = await Group.find();
    if (!groups) return next(createError(404, "Not found"));
    res.status(200).json(groups);
  }
  async createOne(req, res) {
    const group = new Group({ ...req.body });
    await group.save();
    res.status(200).json(group);
  }
}

module.exports = new GroupController();
