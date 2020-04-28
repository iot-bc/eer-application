/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:47
 * @Filename: index.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const registerRouter = require("./register");
const adminRouter = require("admin");
const memberRouter = require("member");
const teacherRouter = require("teacher");

let testRouter = require("test");

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/admin", adminRouter);
router.use("/member", memberRouter);
router.use("/teacher", teacherRouter);

router.use("/test", testRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
  next();
});

module.exports = router;
