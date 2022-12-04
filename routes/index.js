const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const tagRouter = require("./tagRouter");
const groupRouter = require("./groupRouter");
const commentRouter = require("./commentRouter");
const compositionRouter = require("./compositionRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/tag", tagRouter);
router.use("/group", groupRouter);
router.use("/comment", commentRouter);
router.use("/composition", compositionRouter);

module.exports = router;
