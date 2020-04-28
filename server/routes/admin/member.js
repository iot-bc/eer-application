/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:23
 * @Filename: member.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router.get("/", function(req, res, next) {
  let queryString = req.query;
  let queryParam = {};
  if (queryString.orgID) queryParam.oid = queryString.orgID;
  if (queryString.teacherID) queryParam.tid = queryString.teacherID;
  if (queryParam === {}) next();
  // logic process using queryParam
  res.json(queryParam);
});

router.get("/:memberID", function(req, res, next) {
  let mid = req.params.memberID;
  if (!mid) next();
  else {
    // logic process
    res.json("get member info of id " + mid);
  }
});

module.exports = router;
