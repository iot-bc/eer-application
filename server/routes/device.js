/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/24 下午7:42
 * @Filename: device.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  if (req.url === null) next();
  res.send({ device: "laoge's device" });
});

router.post("/", function(req, res, next) {
  if (req.url === null) next();
  res.send({ device: "laoge's device been updated" });
});

router.get("/all", function(req, res, next) {
  if (req.url === null) next();
  res.send({ device: "laoge's devicessss" });
});

module.exports = router;
