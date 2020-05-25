/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/22 下午6:43
 * @Filename: login.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();
const Message = require("./../utils/message");

const userService = require("./../services/serviceFactory").UserService();

router.post("/", function(req, res, next) {
  console.log(req.originalUrl);
  console.log(req.body);
  let isSuccess = userService.userLogin(req.body.username, req.body.password);
  console.log(isSuccess ? 1111 : 0);
  if (!isSuccess) {
    //登陆失败
    res.json(new Message(false, null, `Wrong password or invalid username`));
  }
  //登陆成功 isSuccess是一个[]，第一个项是加密过后的用户id（mongoDB为其生成的），第二个项是用户的类型
  res.json(
    new Message(
      true,
      isSuccess,
      `${isSuccess["type"]} ${req.body.username} login`
    )
  );

  next();
});

module.exports = router;
