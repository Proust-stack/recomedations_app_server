const Router = require("express");

const groupController = require("../controllers/groupController");
const router = new Router();

router.get("/all", groupController);
router.post("/create", groupController);

module.exports = router;
