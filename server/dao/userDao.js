var user = require("./../models/user.js");

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
  };
}

module.exports = UserDao;
