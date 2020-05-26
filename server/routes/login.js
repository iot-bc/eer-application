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

router.post("/", async function(req, res, next) {
  let isSuccess = await userService.userLogin(
    req.body.username,
    req.body.password
  );
  console.log(isSuccess);
  if (!isSuccess) {
    //登陆失败
    return res.json(
      new Message(false, null, `Wrong password or invalid username`)
    );
  } else {
    //登陆成功 isSuccess是一个[]，第一个项是加密过后的用户id（mongoDB为其生成的），第二个项是用户的类型
    return res.json(
      new Message(true, isSuccess, `${isSuccess[0]} ${req.body.username} login`)
    );
  }
});

module.exports = router;
