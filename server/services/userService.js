const connect = require("./../utils/db");
connect();
const EncryptMethod = require("./../utils/encryptMethod");
const IDProducer = require("./../utils/idProducer");
const idProducer = new IDProducer();
const encryptMethod = new EncryptMethod();

const User = require("./../models/userSchema");
const Device = require("./../models/deviceSchema");
const Employment = require("./../models/employmentSchema");
const Organization = require("./../models/organizationSchema");

function UserService() {
  this.userRegister = function(userName, password, userType, orgID) {
    let isRegistered = false;

    User.findOne({ userName: userName }, function(err, user) {
      if (user) isRegistered = true;
    });

    if (isRegistered == false) {
      if (userType == "teacher") {
        let user = new User({
          teacherCode: idProducer.produceTeacherID(),
          userName: userName,
          password: encryptMethod.hashEncrypt(),
          userType: userType,
          orgID: orgID
        });

        user.save(function(err, user) {
          if (err) return console.error(err);
          console.log("save successfully");
          return encryptMethod.IDEncrypt(user._id);
        });
      } else {
        let user = new User({
          userName: userName,
          password: encryptMethod.hashEncrypt(),
          userType: userType,
          orgID: orgID
        });

        user.save(function(err, user) {
          if (err) return console.error(err);
          console.log("save successfully");
          return encryptMethod.IDEncrypt(user._id);
        });
      }
    } else return false;
  };

  this.userLogin = function(userName, password) {
    User.findOne({ userName: userName }, function(err, user) {
      if (err) return console.err(err);
      if (password == user.getPassword())
        return [encryptMethod.IDEncrypt(user._id), user.getType()];
      else return false;
    });
  };

  this.getUserInformation = function(_idUser) {
    User.findById(encryptMethod.IDDecrypt(_idUser), function(err, user) {
      if (err) return console.err(err);
      return [_idUser, user];
    });
  };

  this.userRegisterDevice = function(_idUser, deviceName) {
    let device = new Device({
      deviceToken: idProducer.produceDeviceID(),
      deviceName: deviceName,
      _idUser: encryptMethod.IDDecrypt(_idUser)
    });

    device.save(function(err, device) {
      if (err) return console.err(err);
      console.log("save successfully");
      return [_idUser, encryptMethod.IDEncrypt(device._id)];
    });
  };

  this.userCheckDevice = function(_idUser) {
    Device.findOne({ _idUser: encryptMethod.IDDecrypt(_idUser) }, function(
      err,
      device
    ) {
      if (err) return console.err(err);
      if (device)
        return [
          _idUser,
          encryptMethod.IDEncrypt(device._id),
          device.getDeviceName()
        ];
      else return [_idUser, "no device"];
    });
  };

  //还需借助区块链
  this.userGetDataFromDevice = function() {};

  this.userCancelDevice = function(_idUser, _idDevice) {
    Device.findOneAndRemove(
      { _idDevice: encryptMethod.IDDecrypt(_idDevice) },
      function(err, device) {
        if (err) return console.err(err);
        return [_idUser, _idDevice];
      }
    );
  };

  //展示学生可选的组织（不一定需要）
  this.showOrganizationsToMember = function(_idMember) {};

  //学生改变组织（不一定需要）
  this.memberChangeOrganization = function(
    _idMember,
    originalOrgID,
    newOrgID
  ) {};

  //展示学生在该组织中可选的老师
  this.showTeachers = function(_idMember, orgID) {
    let teacher_chosen_ids = [];
    Employment.find(
      { _idMember: encryptMethod.IDDecrypt(_idMember) },
      "_idTeacher",
      function(err, _ids) {
        if (err) return console.err(err);
        teacher_chosen_ids = _ids;
      }
    );

    let teachers_all = [];
    User.find({ orgID: orgID, type: "teacher" }, function(err, users) {
      if (err) return console.err(err);
      teachers_all = users;
    });

    let teachers = [];

    for (let i = 0; i < teachers_all.length; i++) {
      let isChosen = false;
      for (let j = 0; j < teacher_chosen_ids.length; j++) {
        if (teachers_all[i]._id == teacher_chosen_ids[j]) {
          isChosen = true;
          break;
        }
      }

      if (!isChosen) {
        teachers.push(teachers_all[i]);
      }
    }

    return [_idMember, teachers];
  };

  this.memberEmployTeacher = function(_idMember, _idTeacher) {
    let employment = new Employment({
      _idMember: encryptMethod.IDEncrypt(_idMember),
      _idTeacher: encryptMethod.IDEncrypt(_idTeacher)
    });

    employment.save(function(err, employment) {
      if (err) return console.err(err);
      console.log("save successfully");
      return _idMember;
    });
  };

  this.memberUnemployTeacher = function(_idMember, _idTeacher) {
    Employment.findOneAndRemove(
      {
        _idMember: encryptMethod.IDDecrypt(_idMember),
        _idTeacher: encryptMethod.IDDecrypt(_idTeacher)
      },
      function(err, employment) {
        if (err) return console.err(err);
        return _idMember;
      }
    );
  };

  //老师查看其所带的学生
  this.teacherCheckMembers = function(_idTeacher) {
    let student_ids = [];
    Employment.find(
      { _idTeacher: encryptMethod.IDDecrypt(_idTeacher) },
      "_idMember",
      function(err, ids) {
        if (err) return console.err(err);
        student_ids = ids;
      }
    );

    return [_idTeacher, student_ids];
  };

  //还需进行区块链相关操作
  this.teacherGetDataOfMember = function() {};
}

module.exports = UserService;
