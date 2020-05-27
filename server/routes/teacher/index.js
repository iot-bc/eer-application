/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:56
 * @Filename: index.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const teacherInfoRouter = require("./info");
const teacherCourseRouter = require("./course");
const teacherDataRouter = require("./data");

router.use("/info", teacherInfoRouter);
router.use("/course", teacherCourseRouter);
router.use("/data", teacherDataRouter);

module.exports = router;
