function Device() {
  var userID;
  var deviceName;
  var deviceID;
  var state;

  this.setUserID = function(userID) {
    this.userID = userID;
  };

  this.getUserID = function() {
    return this.userID;
  };

  this.setDeviceName = function(deviceName) {
    this.deviceName = deviceName;
  };

  this.getDeviceName = function() {
    return this.deviceName;
  };

  this.setDeviceID = function(deviceID) {
    this.deviceID = deviceID;
  };

  this.getDeviceID = function() {
    return this.deviceID;
  };

  this.setState = function(state) {
    this.state = state;
  };

  this.getState = function() {
    return this.state;
  };
}

module.exports = Device;
