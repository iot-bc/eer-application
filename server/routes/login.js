/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/22 下午6:43
 * @Filename: login.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();

const UserService = require("./../services/userService");

router.post("/", function(req, res, next) {
  console.log(req.body);
  let isSuccess = UserService.userLogin(req.body.username, req.body.password);
  if (isSuccess == false) {
    //登陆失败
  } else {
    //登陆成功 isSuccess是一个[]，第一个项是加密过后的用户id（mongoDB为其生成的），第二个项是用户的类型
  }

  res.send({
    resCode: true
  });
  // next();
});

module.exports = router;
