const Router = require("express");

const compositionController = require("../controllers/compositionController");
const adminCheckMiddleware = require("../middlewares/adminCheckMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post(
  "/create",
  authMiddleware,
  adminCheckMiddleware,
  compositionController.create
);
router.get("/tags", compositionController.getByTags);

module.exports = router;
