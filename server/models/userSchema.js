const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },

  userName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  userType: {
    type: String,
    required: true,
    enum: ["student", "coach", "teacher"]
  },

  schoolID: {
    type: String
  },

  gymID: {
    type: String
  },

  registerDate: {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods.setUserID = function(userID) {
  this.userID = userID;
};

userSchema.methods.getUserID = function() {
  return this.userID;
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

userSchema.methods.getUSerType = function() {
  return this.userType;
};

userSchema.methods.setSchoolID = function(schoolID) {
  this.schoolID = schoolID;
};

userSchema.methods.getSchoolID = function() {
  return this.schoolID;
};

userSchema.methods.setGymID = function(gymID) {
  this.gymID = gymID;
};

userSchema.methods.getGymID = function() {
  return this.gymID;
};

userSchema.methods.getRegisterDate = function() {
  return this.registerDate;
};

let User = mongoose.model("User", userSchema);
module.exports = User;
