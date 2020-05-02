/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:30
 * @Filename: course.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router.get("/", function(req, res, next) {
  // logic process
  if (req.body) next();
  res.json("get list of members belong ");
});

router.post("/", function(req, res, next) {
  let tcode = req.body.tcode;
  // logic process
  if (!tcode) next();
  res.json("set course successfully");
});

router.get("/:memberID", function(req, res, next) {
  let mid = req.params.memberID;
  // logic process
  if (!mid) next();
  res.json("get info of member with id " + mid);
});

module.exports = router;
