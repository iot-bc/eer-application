/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/26 下午8:28
 * @Filename: group.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  if (req.url === null) next();
  res.send({ device: "laoge's devicessss" });
});

router
  .route("/:coachId")
  .all({})
  .post();
