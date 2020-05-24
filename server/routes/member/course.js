/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: course.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const UserService = require("./../services/userService");
const UserSchema = require("./../models/userSchema");

router.get(
  "/",
  // teacher list
  function(req, res, next) {
    //logic process
    //第一个参数就是这个member的id，第二个参数是这个member所属组织的id
    //得到的结果是一个[]，第一项是member的id，第二项是一个list，里面放的是很多个userSchema实体，都是该学生可以选的老师
    let result = UserService.showTeachers(req.body.id, req.body.orgid);

    if (!req.originalUrl) next();
    res.json("teachersssss");
  }
);

router.delete("/:teacherID", function(req, res, next) {
  let tid = req.params.teacherID;
  // logic process
  // id即学生的id
  let id = UserService.memberUnemployTeacher(req.body.id, tid);
  if (!req.originalUrl) next();
  res.json("delete teacher " + tid);
});

router.post("/:teacherID", function(req, res, next) {
  let tid = req.params.teacherID;
  let tcode = req.body.code;
  // logic process
  //这里id就是学生的id，直接选做老师就好，感觉没必要再选课，简单一点
  let id = UserService.memberEmployTeacher(req.body.id, tid);
  if (!tid) next();
  res.json("choose this teacher " + tid + " code " + tcode);
});

module.exports = router;
