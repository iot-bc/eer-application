/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:55
 * @Filename: index.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const memberInfoRouter = require("./info");
const memberDeviceRouter = require("./device");
const memberCourseRouter = require("./course");
const memberDataRouter = require("./data");

router.use("/info", memberInfoRouter);
router.use("/device", memberDeviceRouter);
router.use("/teacher", memberCourseRouter);
router.use("/data", memberDataRouter);

module.exports = router;
