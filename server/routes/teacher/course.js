/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:30
 * @Filename: course.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();
const UserService = require("./../services/userService");
const UserSchema = require("./../models/userSchema");

router.get("/", function(req, res, next) {
  // logic process
  // id是老师的id，获得的result是一个[]，第一项是老师id，第二项是学生列表
  let result = UserService.teacherCheckMembers(req.body.id);
  if (req.body) next();
  res.json("get list of members belong ");
});

router.post("/", function(req, res, next) {
  let tcode = req.body.tcode;
  // logic process
  // 感觉没必要再设置课程之类的了，直接选老师就完事
  if (!tcode) next();
  res.json("set course successfully");
});

router.get("/:memberID", function(req, res, next) {
  let mid = req.params.memberID;
  // logic process
  // info是一个[]，第二项就是获得的memberSchema实体，直接get出信息
  let info = UserService.getUserInformation(mid);
  if (!mid) next();
  res.json("get info of member with id " + mid);
});

module.exports = router;
