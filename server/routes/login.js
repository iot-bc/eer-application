/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/22 下午6:43
 * @Filename: login.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

router.post("/", function(req, res, next) {
  console.log(req.body); // username password
  res.send({
    resCode: true
  });
  // next();
});

module.exports = router;
