const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const groupRouter = require("./groupRouter");
const commentRouter = require("./commentRouter");
const compositionRouter = require("./compositionRouter");
const tagRouter = require("./tagRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/group", groupRouter);
router.use("/comment", commentRouter);
router.use("/composition", compositionRouter);
router.use("/tag", tagRouter);

module.exports = router;
