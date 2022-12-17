const Router = require("express");

const compositionController = require("../controllers/compositionController");
const adminCheckMiddleware = require("../middlewares/adminCheckMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/create", authMiddleware, compositionController.create);
router.patch(
  "/userrating/:id",
  authMiddleware,
  compositionController.setUserRating
);
router.get("/tags", compositionController.getByTags);
router.get("/all/:id", compositionController.getAllByGroup);
router.get("/:id", compositionController.getOne);
router.get(
  "/compositions/all/nofilter",
  compositionController.getAllCompositions
);

module.exports = router;
