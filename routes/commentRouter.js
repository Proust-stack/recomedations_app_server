const Router = require("express");

const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.get("/:id", commentController.getAll);
router.delete("/:id", authMiddleware, commentController.delete);
router.post("/create", authMiddleware, commentController.create);

module.exports = router;
