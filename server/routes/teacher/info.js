/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: info.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();
const UserService = require("./../../services/userService");
const Message = require("./../../utils/message");

router.get("/", function(req, res, next) {
  let tid = res.locals["teacherID"];
  // logic process
  // info是一个[]，第一项是id，第二项是userSchema实体类，get获得数据
  let info = UserService.getUserInformation(tid);
  // Todo process
  res.json(new Message(true, info, ""));
});

module.exports = router;
