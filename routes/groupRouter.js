const Router = require("express");

const groupController = require("../controllers/groupController");
const router = new Router();

router.get("/all", groupController.getAll);
router.post("/create", groupController.createOne);

module.exports = router;
