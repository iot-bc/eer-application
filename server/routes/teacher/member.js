/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:30
 * @Filename: member.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router.get("/", function(req, res, next) {
  // logic process
  if (req.body) next();
  res.json("get list of members belong ");
});

router.get("/:memberID", function(req, res, next) {
  let mid = req.params.memberID;
  // logic process
  if (!mid) next();
  res.json("get info of member with id " + mid);
});

module.exports = router;
