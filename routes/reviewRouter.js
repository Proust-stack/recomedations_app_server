const Router = require("express");

const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.get("/:id", reviewController.getOne);
router.get("/all/search", reviewController.search);
router.get("/all/:id", authMiddleware, reviewController.getAllOfUser);
router.get("/all/composition/:id", reviewController.getAllOfComposition);
router.get("/all/reviews/bytags", reviewController.getByTags);
router.post("/create", authMiddleware, reviewController.createReview);
router.patch("/:id", authMiddleware, reviewController.updateReview);
router.delete("/remove", authMiddleware, reviewController.deleteReview);
router.patch("/like/:id", authMiddleware, reviewController.like);
router.patch("/unLike/:id", authMiddleware, reviewController.unLike);

module.exports = router;
