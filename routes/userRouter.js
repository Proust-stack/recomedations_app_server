const Router = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminCheckMiddleware = require("../middlewares/adminCheckMiddleware");
const router = new Router();

router.get("/all", authMiddleware, adminCheckMiddleware, userController.getAll);
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.post("/auth/github", userController.githubLogin);
router.post("/auth/twitter", userController.twitterLogin);
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
router.delete(
  "/:id",
  authMiddleware,
  adminCheckMiddleware,
  userController.deleteUser
);

module.exports = router;
