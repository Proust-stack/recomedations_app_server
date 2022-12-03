const Router = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminCheckMiddleware = require("../middlewares/adminCheckMiddleware");
const router = new Router();

router.get("/:id", authMiddleware, userController);
router.get("/all", authMiddleware, adminCheckMiddleware, userController);
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.post("/google", userController);
router.post("/twitter", userController);
router.patch(
  "/block/:id",
  authMiddleware,
  adminCheckMiddleware,
  userController.blockUser
);
router.patch(
  "/unblock/:id",
  authMiddleware,
  adminCheckMiddleware,
  userController.unblockUser
);
router.patch("/like/:id", authMiddleware, userController.likeUser);
router.patch("/unLike/:id", authMiddleware, userController.unLikeUser);
router.delete(
  "/:id",
  authMiddleware,
  adminCheckMiddleware,
  userController.deleteUser
);

module.exports = router;
