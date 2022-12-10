const Router = require("express");

const compositionController = require("../controllers/compositionController");
const adminCheckMiddleware = require("../middlewares/adminCheckMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/create", authMiddleware, compositionController.create);
router.get("/tags", compositionController.getByTags);
router.get("/all/:id", compositionController.getAllByGroup);

module.exports = router;
