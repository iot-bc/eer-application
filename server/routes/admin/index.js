/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:22
 * @Filename: 1.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

const adminOrgRouter = require("./org");
const adminTeacherRouter = require("./teacher");
const adminMemberRouter = require("./member");

router.use("/org", adminOrgRouter);
router.use("/teacher", adminTeacherRouter);
router.use("/member", adminMemberRouter);

module.exports = router;
