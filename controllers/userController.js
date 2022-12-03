const User = require("../models/userModel");

class UserController {
  async login(req, res, next) {
    const { name } = req.body;
    try {
      let user = await User.findOne({ name });
      if (!user) {
        user = await User.create({
          name,
        });
      }
      res.status(200).json(user.name);
    } catch (error) {
      res.status(500);
    }
  }
}

module.exports = new UserController();
