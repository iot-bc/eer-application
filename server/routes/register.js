/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/22 下午6:44
 * @Filename: register.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

router.post("/", function(req, res, next) {
  console.log(req.body); // username password type orgcode
  res.send({
    resCode: true
  });
  // next();
});

module.exports = router;
