const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class UserController {
  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
  async blockUser(req, res, next) {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("user blocked");
  }

  async unblockUser(req, res, next) {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("user unblocked");
  }

  async deleteUser(req, res, next) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  }
  async googleSignin(req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      user = await newUser.save();
    }
    const token = jwt.sign(
      { id: user._id, admin: user.isAdmin, blocked: user.blocked },
      process.env.SECRET_FOR_JWT
    );
    return res.cookie("access_token", token).status(200).json(user._doc);
  }
  async twitterLogin(req, res, next) {}
}

module.exports = new UserController();
