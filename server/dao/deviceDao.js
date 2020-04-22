var Device = require("./../models/device");

function DeviceDao() {
  this.addDevice = function(device) {
    var deviceName = device.getDeviceName();
    var deviceID = device.getDeviceID();
    var userID = device.getUserID();
    var state = device.getState();

    //database insert operation
  };

  this.deleteDevice = function(device) {
    var deviceID = device.getDeviceID();

    //database delete operation
  };

  this.updateDevice = function(device) {
    var deviceName = device.getDeviceName();
    var deviceID = device.getDeviceID();
    var userID = device.getUserID();
    var state = device.getState();

    //database update operation
  };

  this.searchDevice = function(device) {
    var deviceName = device.getDeviceName();
    var deviceID = device.getDeviceID();
    var userID = device.getUserID();
    var state = device.getState();

    //database search operation

    //查出来的数据应该是一个数组
    var result = new Device();
    return result;
  };
}

module.exports = DeviceDao;
