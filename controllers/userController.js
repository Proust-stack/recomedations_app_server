const createError = require("../utils/error");
const generateJwt = require("../utils/jwt");
const User = require("../models/user");

class UserController {
  async signin(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(createError(401, "There is no such user"));
    }
    if (!user.blocked) {
      next(createError(401, "User is blocked"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      next(createError(403, "Password is not correct"));
    }
    const token = generateJwt(user._id, user.isAdmin, user.blocked);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
    return res.json({ token });
  }

  async signup(req, res, next) {
    const { email, username } = req.body;
    if (!email || !username) {
      res.status(400).json("All the fields required");
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      next(
        createError(
          403,
          "The user with this email already exists, check you spelling"
        )
      );
    }
    const newUser = new User({ email, username });
    await newUser.save();
    const token = generateJwt(newUser.id, newUser.isAdmin, newUser.blocked);
    res.status(200).json({ token });
  }

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
  async githubLogin(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = generateJwt(user._id, user.isAdmin, user.blocked);
        return res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(user._id);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const user = await newUser.save();
        const token = generateJwt(user._id, user.isAdmin, user.blocked);
        return res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(user._id);
      }
    } catch (err) {
      next(err);
    }
  }
  async twitterLogin(req, res, next) {}
}

module.exports = new UserController();
