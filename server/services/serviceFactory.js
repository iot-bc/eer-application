/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/26 上午12:39
 * @Filename: serviceFactory.js
 * @Function: do nothing >_>
 */

const UserService = require("./userService");
const DeviceService = require("./deviceService");

module.exports = {
  UserService: () => new UserService(),
  DeviceService: () => new DeviceService()
};
