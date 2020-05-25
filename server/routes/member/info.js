/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: info.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const UserService = require("./../../services/userService");
const UserSchema = require("./../../models/userSchema");

router.get("/", function(req, res, next) {
  // logic process
  //这里info是一个[]，第一项是经过加密的id，第二项是这个userSchema对象，可通过get方法拿出信息
  let info = UserService.getUserInformation(req.body.id);

  if (req.body) next();
  res.json(req.originalUrl);
});

module.exports = router;
