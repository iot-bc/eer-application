const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  teacherCode: {
    type: String,
    unique: false
  },

  userName: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  userType: {
    type: String,
    required: true,
    enum: ["member", "teacher"]
  },

  orgID: {
    type: String
  }
});

userSchema.methods.setTeacherCode = function(teacherCode) {
  this.teacherCode = teacherCode;
};

userSchema.methods.getTeacherCode = function() {
  return this.teacherCode;
};

userSchema.methods.setUserName = function(userName) {
  this.userName = userName;
};

userSchema.methods.getUserName = function() {
  return this.userName;
};

userSchema.methods.setPassword = function(password) {
  this.password = password;
};

userSchema.methods.getPassword = function() {
  return this.password;
};

userSchema.methods.setUserType = function(userType) {
  this.userType = userType;
};

userSchema.methods.getUserType = function() {
  return this.userType;
};

userSchema.methods.setOrgID = function(orgID) {
  this.orgID = orgID;
};

userSchema.methods.getOrgID = function() {
  return this.orgID;
};

let User = mongoose.model("User", userSchema);
module.exports = User;
