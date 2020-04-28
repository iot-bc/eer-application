/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:23
 * @Filename: teacher.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router.get("/", function(req, res, next) {
  let queryString = req.query;
  let queryParam = {};
  if (queryString.orgID) queryParam.oid = queryString.orgID;
  if (queryParam === {}) next();
  // logic process using queryParam
  res.json(queryParam);
});

router.get("/:teacherID", function(req, res, next) {
  let mid = req.params.teacherID;
  if (!mid) next();
  else {
    // logic process
    res.json("get teacher info of id " + mid);
  }
});

module.exports = router;
