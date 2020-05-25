/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/22 下午6:44
 * @Filename: register.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

const UserService = require("./../services/userService");

router.post("/", function(req, res, next) {
  console.log(req.body);
  let isSuccess = UserService.userRegister(
    req.body.username,
    req.body.password,
    req.body.type,
    req.body.orgid
  );
  if (isSuccess == false) {
    //注册失败，用户名重复
  } else {
    //注册成功，isSuccess的值是mongoDB为用户生成的id（经过了加密）
  }

  res.send({
    resCode: true
  });
  // next();
});

module.exports = router;
