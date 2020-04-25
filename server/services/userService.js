const connect = require("./../utils/db");
connect();
const EncryptMethod = require("./../utils/encryptMethod");
const IDProducer = require("./../utils/idProducer");
const idProducer = new IDProducer();
const encryptMethod = new EncryptMethod();

const User = require("./../models/userSchema");
const Device = require("./../models/deviceSchema");
const Employment = require("./../models/employmentSchema");

function UserService() {
  this.studentRegister = function(userName, password) {
    let user = new User({
      userID: idProducer.produceStudentID(),
      userName: userName,
      password: encryptMethod.hashEncrypt(),
      userType: "student"
    });

    user.save(function(err, user) {
      if (err) return console.error(err);
      console.log("save successfully");
      return user.getUserID();
    });
  };

  this.teacherRegister = function(userName, password, schoolID) {
    let user = new User({
      userID: idProducer.produceTeacherID(),
      userName: userName,
      password: encryptMethod.hashEncrypt(),
      userType: "teacher",
      schoolID: schoolID
    });

    user.save(function(err, user) {
      if (err) return console.error(err);
      console.log("save successfully");
      return user.getUserID();
    });
  };

  this.coachRegister = function(userName, password, gymID) {
    let user = new User({
      userID: idProducer.produceCoachID(),
      userName: userName,
      password: encryptMethod.hashEncrypt(),
      userType: "coach",
      gymID: gymID
    });

    user.save(function(err, user) {
      if (err) return console.error(err);
      console.log("save successfully");
      return user.getUserID();
    });
  };

  this.userLogin = function(userID, password, type) {
    User.findOne({ userID: userID }, function(err, user) {
      if (err) return console.err(err);
      if (password == user.getPassword() && type == user.getUserType())
        return true;
      else return false;
    });
  };

  this.userRegisterDevice = function(userID, deviceName) {
    let device = new Device({
      deviceID: idProducer.produceDeviceID(),
      deviceName: deviceName,
      userID: userID
    });

    device.save(function(err, device) {
      if (err) return console.err(err);
      console.log("save successfully");
      return device.getDeviceID();
    });
  };

  this.userCancelDevice = function(deviceID) {};

  //展示学生可选的组织
  this.showOrganizations = function(userID) {};

  this.studentJoinOrganization = function(
    userID,
    organizationType,
    organizationID
  ) {
    if (organizationType == "school")
      User.findOneAndUpdate(
        { userID: userID },
        { $set: { schoolID: organizationID } },
        function(err, user) {
          if (err) return console.log(err);
          console.log(user);
        }
      );
    else
      User.findOneAndUpdate(
        { userID: userID },
        { $set: { gymID: organizationID } },
        function(err, user) {
          if (err) return console.log(err);
          console.log(user);
        }
      );
  };

  this.studentDropOrganization = function(userID, organizationID) {};

  //展示学生在该组织中可选的指导者，包括老师和健身教练
  this.showInstructors = function(userID, organizationID) {};

  this.studentEmployInstructor = function(studentID, instructorID) {
    let employment = new Employment({
      studentID: studentID,
      instructorID: instructorID
    });

    employment.save(function(err, employment) {
      if (err) return console.err(err);
      console.log("save successfully");
    });
  };

  this.studentUnemployInstructor = function(studentID, instructorID) {};

  this.userCheckDevices = function(userID) {};

  //学生查看他的指导者
  this.studentCheckInstructors = function(userID) {};

  //学生查看其所属组织，最多两个，一个学校，一个健身房，也可以一个都没有
  this.studentCheckOrganizations = function(userID) {};

  //指导者查看其所带的学生
  this.instructorCheckStudents = function(userID) {};
}

module.exports = UserService;
