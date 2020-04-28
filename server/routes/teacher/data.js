/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: data.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router.get("/:memberID", function(req, res, next) {
  let mid = req.params.memberID;
  // logic process
  if (!mid) next();
  res.json("get data of member with id " + mid);
});

module.exports = router;
