/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:32
 * @Filename: data.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();
const userService = require("./../../services/serviceFactory").UserService();
const Message = require("./../../utils/message");

router.get("/", async function(req, res) {
  let mid = res.locals["memberID"];
  let data = await userService.memberGetDataFromDevice(mid);
  // logic process
  if (data) {
    return res.json(new Message(true, data, ""));
  } else return res.json(new Message(false, null, ""));
});

module.exports = router;
