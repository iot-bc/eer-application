/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/24 下午7:42
 * @Filename: device.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();
const userService = require("./../../services/serviceFactory").UserService();
const Message = require("./../../utils/message");

router
  .route("/")
  .all(function(req, res, next) {
    console.log(req.originalUrl);
    next();
  })
  .get(async function(req, res) {
    let mid = res.locals["memberID"];
    // logic process
    // deviceInfo是一个[]，如果用户有设备则第一项是加密后用户id，第二项是加密后设备的id（mongodb自动生成的），第三项是设备名字。
    // 反之第二项则是“no device”，无第三项
    let deviceInfo = await userService.userCheckDevice(mid);
    if (deviceInfo[1] === "no device") {
      //用户还无设备
      return res.json(new Message(false, null, "No device yet"));
    } else {
      //用户已有设备
      return res.json(new Message(true, deviceInfo, "Has a device"));
    }
  })
  .post(async function(req, res, next) {
    // 用户注册设备，得到的结果是一个[]，第一项是加密过后用户的id，第二项是加密过后设备的id（mongodb自动生成的）
    let mid = res.locals["memberID"];
    let deviceToken = req.body.deviceToken;
    console.log(deviceToken + "++++++");
    let result = await userService.userRegisterDevice(mid, deviceToken);

    if (result) {
      return res.json(new Message(true, result, ""));
    } else return res.json(new Message(false, result, ""));
  })
  // .put(function(req, res, next) {
  //   if (req.url === null) next();
  //   res.send({ device: "laoge's devicessss" });
  // })
  .delete(async function(req, res, next) {
    //result是一个[]，第一项是用户id，第二项是设备id
    // Todo 直接删用户设备，后端找出设备; 操作成功与否判断
    let mid = res.locals["memberID"];
    let result = await userService.userCancelDevice(mid);

    if (req.url === null) next();
    res.send({ device: "laoge's devicessss" });
  });

module.exports = router;
