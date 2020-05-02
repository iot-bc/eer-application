/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: course.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router.get(
  "/",
  // teacher list
  function(req, res, next) {
    //logic process
    if (!req.originalUrl) next();
    res.json("teachersssss");
  }
);

router.delete("/:teacherID", function(req, res, next) {
  let tid = req.params.teacherID;
  // logic process
  if (!req.originalUrl) next();
  res.json("delete teacher " + tid);
});

router.post("/:teacherID", function(req, res, next) {
  let tid = req.params.teacherID;
  let tcode = req.body.code;
  // logic process
  if (!tid) next();
  res.json("choose this teacher " + tid + " code " + tcode);
});

module.exports = router;
