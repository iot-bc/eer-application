var User = require("./../models/user");

function UserDao() {
  this.addUser = function(user) {
    var userID = user.getUserID();
    var userName = user.getUserName();
    var password = user.getPassword();

    //database insert operation
  };

  this.deleteUser = function(user) {
    var userID = user.getUserID();

    //database delete operation
  };

  this.updateUser = function(user) {
    var userID = user.getUserID();
    var userName = user.getUserName();
    var password = user.getPassword();

    //database update operation
  };

  this.searchUser = function(user) {
    var userID = user.getUserID();
    var userName = user.getUserName();
    var password = user.getPassword();

    //database search operation

    //查出来的数据可能是一个数组，先这么表示
    var result = new User();

    return result;
  };
}

module.exports = UserDao;
