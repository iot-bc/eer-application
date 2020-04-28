/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:23
 * @Filename: org.js
 * @Function: do nothing >_>
 */
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  // logic process using queryParam
  res.json("orgs");
});

router.get("/:orgID", function(req, res, next) {
  let oid = req.params.teacherID;
  if (!oid) next();
  else {
    // logic process
    res.json("get org info of id " + oid);
  }
});

module.exports = router;
