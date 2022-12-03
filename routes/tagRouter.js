const Router = require("express");

const tagController = require("../controllers/tagController");
const router = new Router();

router.get("/all", tagController);
router.post("/add", tagController);

module.exports = router;
