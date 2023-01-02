const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Review = require("../models/review");

class UserController {
  async getAll(req, res) {
    const users = await User.find();
    return res.json(users);
  }
  async blockUser(req, res, next) {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        blocked: true,
      },
      { new: true }
    );
    res.status(200).json(user);
  }

  async unblockUser(req, res, next) {
    await User.findByIdAndUpdate(req.params.id, {
      blocked: false,
    });
    res.status(200).json("user unblocked");
  }
  async changeRole(req, res, next) {
    const user = await User.findById(req.params.id);
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.status(200).json("role changed");
  }

  async deleteUser(req, res, next) {
    await User.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ user: req.params.id });
    res.status(200).json("User and his reviews have been deleted.");
  }

  async signin(req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User({
        ...req.body,
      });
      user = await newUser.save();
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_FOR_JWT,
      { expiresIn: "800h" }
    );
    res
      .cookie("access_token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: false,
      })
      .status(200)
      .json(user._doc);
    // res.status(200).json({ token });
  }
}

module.exports = new UserController();
