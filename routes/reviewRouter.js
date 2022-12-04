const Router = require("express");

const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.get("/:id", reviewController.getOne);
router.get("/all/:id", reviewController.getAllOfUser);
router.post("/create", authMiddleware, reviewController.createReview);
router.patch("/:id", authMiddleware, reviewController.updateReview);
router.delete("/:id", authMiddleware, reviewController.deleteReview);
router.patch("/like/:id", authMiddleware, reviewController.like);
router.patch("/unLike/:id", authMiddleware, reviewController.unLike);

module.exports = router;
