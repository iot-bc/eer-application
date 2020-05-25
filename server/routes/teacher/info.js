/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: info.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();
const UserService = require("./../services/userServce");
const UserSchema = require("./../models/userSchema");

router.get("/", function(req, res, next) {
  // logic process
  // info是一个[]，第一项是id，第二项是userSchema实体类，get获得数据
  let info = UserService.getUserInformation(req.body.id);

  if (req.body) next();
  res.json(req.originalUrl);
});

module.exports = router;
