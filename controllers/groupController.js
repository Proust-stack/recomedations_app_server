const Group = require("../models/group");
const createError = require("../utils/error");

class GroupController {
  async getAll(req, res) {
    const groups = await Group.find();
    res.status(200).json(groups);
  }
  async createOne(req, res) {
    const group = new Group({ ...req.body });
    res.status(200).json(group);
  }
}

module.exports = new GroupController();
