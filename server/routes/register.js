/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/22 下午6:44
 * @Filename: register.js
 * @Function: do nothing >_>
 */

const express = require("express");
const router = express.Router();
const Message = require("./../utils/message");

const userService = require("./../services/serviceFactory").UserService();

router.post("/", async function(req, res, next) {
  let isSuccess = await userService.userRegister(
    req.body.username,
    req.body.password,
    req.body.type,
    req.body.orgCode
  );
  console.log(isSuccess);
  if (!isSuccess) {
    //注册失败，用户名重复
    return res.json(
      new Message(false, null, `Repeated username: ${req.body.username}`)
    );
  } else {
    //注册成功，isSuccess的值是mongoDB为用户生成的id（经过了加密）
    return res.json(
      new Message(
        true,
        isSuccess,
        `Register successfully, ${req.body.type} ${req.body.username}`
      )
    );
  }
});

module.exports = router;
