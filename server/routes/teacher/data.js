/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:31
 * @Filename: data.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();
const userService = require("./../../services/serviceFactory").UserService();
const Message = require("./../../utils/message");

router.get("/:memberID", async function(req, res, next) {
  let tid = req.locals["teacherID"];
  let mid = req.params.memberID;
  let data = await userService.memberGetDataFromDevice(tid, mid);
  // logic process
  if (data) {
    return res.json(new Message(true, data, ""));
  } else return res.json(new Message(false, null, ""));
});

module.exports = router;
