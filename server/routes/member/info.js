/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: info.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const userService = require("./../../services/serviceFactory").UserService();
const Message = require("./../../utils/message");

router.get("/", async function(req, res, next) {
  let mid = res.locals["memberID"];
  // logic process
  //这里info是一个[]，第一项是经过加密的id，第二项是这个userSchema对象，可通过get方法拿出信息
  let info = await userService.getUserInformation(mid);

  res.json(new Message(true, info, ""));
});

module.exports = router;
