/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: info.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();
const userService = require("./../../services/serviceFactory").UserService();
const Message = require("./../../utils/message");
const firstToUpperCase = require("./../../utils/util").firstToUpperCase;

router.get("/", async function(req, res, next) {
  let tid = res.locals["teacherID"];
  // logic process
  // info是一个[]，第一项是id，第二项是userSchema实体类，get获得数据
  let info = await userService.getUserInformation(tid);
  let data = {
    id: info[0],
    name: info[1]["userName"],
    type: firstToUpperCase(info[1]["userType"]),
    org: info[1]["orgID"]
  };
  res.json(new Message(true, data, ""));
});

module.exports = router;
