const Comment = require("../models/comment");
const createError = require("../utils/error");

class CommentController {
  async getAll(req, res, next) {
    const comments = await Comment.find({ reviewId: req.params.id });
    res.status(200).json(comments);
  }
  async create(req, res, next) {
    const comment = new Comment({ ...req.body, userId: req.user.id });
    await comment.save();
    res.status(200).send(comment);
  }
  async delete(req, res, next) {
    const comment = await Comment.findById(req.params.id);
    if (req.user.id == comment.userId || req.user.isAdmin) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      next(createError(403, "You can delete ony your comment!"));
    }
  }
}

module.exports = new CommentController();
