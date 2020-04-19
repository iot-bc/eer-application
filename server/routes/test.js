/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午7:59
 * @Filename: test.js
 * @Function: do nothing >_>
 */
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("Here responds with a test api resource :(");
  next();
});

module.exports = router;
