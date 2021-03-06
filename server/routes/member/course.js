/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: course.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const userService = require("./../../services/serviceFactory").UserService();
const Message = require("./../../utils/message");

router.get(
  "/",
  // teacher list
  async function(req, res, next) {
    //logic process
    //第一个参数就是这个member的id，第二个参数是这个member所属组织的id
    //得到的结果是一个[]，第一项是member的id，第二项是一个list，里面放的是很多个userSchema实体，都是该学生已经选的或可以选的老师
    let teachers = await userService.showTeachers(res.locals["memberID"]);
    res.json(new Message(true, teachers, "Get teacher lists"));
  }
);

router.delete("/:teacherID", async function(req, res) {
  let mid = res.locals["memberID"];
  let tid = req.params.teacherID;
  // logic process
  // id即学生的id
  let id = await userService.memberUnemployTeacher(mid, tid);
  if (id) {
    return res.json(new Message(true, id, `Delete teacher ${tid}`));
  }
  return res.json(new Message(false, null, "Delete fail"));
});

router.post("/:teacherID", async function(req, res) {
  let mid = res.locals["memberID"];
  let tid = req.params.teacherID;
  // logic process
  //这里id就是学生的id，直接选做老师就好，感觉没必要再选课，简单一点
  let id = await userService.memberEmployTeacher(mid, tid);
  if (id) {
    return res.json(new Message(true, id, `Choose teacher ${tid}`));
  }
  return res.json(new Message(false, null, "Choose fail"));
});

module.exports = router;
