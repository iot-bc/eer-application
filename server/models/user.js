function User(userName, password) {
  var userName;
  var userID;
  var password;
  var accessCode;

  this.userName = userName;
  this.password = password;

  this.setUserName = function(userName) {
    this.userName = userName;
  };

  this.getUserName = function() {
    return this.userName;
  };

  this.setUserID = function(userID) {
    this.userID = userID;
  };

  this.getUserID = function() {
    return this.userID;
  };

  this.setPassword = function(password) {
    this.password = password;
  };

  this.getPassword = function() {
    return this.password;
  };

  this.setAccessCode = function(accessCode) {
    this.accessCode = accessCode;
  };

  this.getAccessCode = function() {
    return this.accessCode;
  };
}

module.exports = User;
