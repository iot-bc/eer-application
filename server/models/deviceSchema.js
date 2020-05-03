const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let deviceSchema = new Schema({
  deviceToken: {
    type: String,
    required: true,
    unique: true
  },

  deviceName: {
    type: String,
    required: true
  },

  _idUser: {
    type: String,
    required: true
  }
});

deviceSchema.methods.setDeviceToken = function(deviceToken) {
  this.deviceToken = deviceToken;
};

deviceSchema.methods.getDeviceToken = function() {
  return this.deviceToken;
};

deviceSchema.methods.setDeviceName = function(deviceName) {
  this.deviceName = deviceName;
};

deviceSchema.methods.getDeviceName = function() {
  return this.deviceName;
};

deviceSchema.methods.set_idUser = function(_idUser) {
  this._idUser = _idUser;
};

deviceSchema.methods.get_idUser = function() {
  return this._idUser;
};

let Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
