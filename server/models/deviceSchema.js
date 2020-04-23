const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let deviceSchema = new Schema({
  deviceID: {
    type: String,
    required: true,
    unique: true
  },

  deviceName: {
    type: String,
    required: true
  },

  userID: {
    type: String,
    required: true
  },

  registerDate: {
    type: Date,
    default: Date.now()
  }
});

deviceSchema.methods.setDeviceID = function(deviceID) {
  this.deviceID = deviceID;
};

deviceSchema.methods.getDeviceID = function() {
  return this.deviceID;
};

deviceSchema.methods.setDeviceName = function(deviceName) {
  this.deviceName = deviceName;
};

deviceSchema.methods.getDeviceName = function() {
  return this.deviceName;
};

deviceSchema.methods.setUserID = function(userID) {
  this.userID = userID;
};

deviceSchema.methods.getUserID = function() {
  return this.userID;
};

deviceSchema.methods.getRegisterDate = function() {
  return this.registerDate;
};

let Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
