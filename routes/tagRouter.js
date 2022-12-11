const Router = require("express");

const tagController = require("../controllers/tagController");
const router = new Router();

router.get("/all", tagController.getAll);
router.get("/one", tagController.getOne);

module.exports = router;
