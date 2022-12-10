const Router = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminCheckMiddleware = require("../middlewares/adminCheckMiddleware");
const router = new Router();

router.get("/all", authMiddleware, userController.getAll);
router.post("/auth/google", userController.googleSignin);
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
