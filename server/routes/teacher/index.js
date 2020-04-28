/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:56
 * @Filename: index.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const teacherInfoRouter = require("./info");
const teacherMemberRouter = require("./member");
const teacherDataRouter = require("./data");

router.use("/info", teacherInfoRouter);
router.use("/member", teacherMemberRouter);
router.use("/data", teacherDataRouter);

module.exports = router;
