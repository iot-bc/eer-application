var User = require("./../models/user");
var Device = require("./../models/device");

var UserDao = require("./../dao/userDao.js");
var DeviceDao = require("./../dao/deviceDao");

var EncryptMethod = require("./../utils/encryptMethod");
var IDproducer = require("./../utils/idProducer");

function UserService() {
  this.userRegister = function(userName, password) {
    var user = new User();
    user.setUserName(userName);

    var encryptMethod = new EncryptMethod();
    var password_hashEncrypt = encryptMethod.hashEncrypt(password);
    user.setPassword(password_hashEncrypt);

    var idProducer = new IDproducer();
    var userID = idProducer.produceUserID();
    user.setUserID(userID);

    var userDao = new UserDao();
    userDao.addUser(user);

    //还需要在区块链中注册ACL等

    return userID;
  };

  this.userCancel = function(user) {
    var userDao = new UserDao();
    userDao.deleteUser(user);

    //还要清除其设备，在区块链上清除其身份
  };
}

module.exports = UserService;
