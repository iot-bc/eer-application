const EncryptMethod = require("./../utils/encryptMethod");
const IDProducer = require("./../utils/idProducer");
const idProducer = new IDProducer();
const encryptMethod = new EncryptMethod();

const User = require("./../models/userSchema");
const Device = require("./../models/deviceSchema");
const Employment = require("./../models/employmentSchema");
const Organization = require("./../models/organizationSchema");

const { Wallets, Gateway } = require("fabric-network");

function UserService() {
  this.userRegister = async function(userName, password, userType, orgID) {
    let isRegistered = false;
    let user_id = "";
    await User.findOne({ userName: userName }, function(err, user) {
      if (err) isRegistered = false;
      if (user) isRegistered = true;
    });

    if (isRegistered === false) {
      if (userType === "teacher") {
        let user = new User({
          teacherCode: idProducer.produceTeacherID(),
          userName: userName,
          password: encryptMethod.hashEncrypt(password),
          userType: userType,
          orgID: orgID
        });

        let _user = await user.save();
        user_id = encryptMethod.IDEncrypt(_user._id);
      } else {
        let user = new User({
          userName: userName,
          password: encryptMethod.hashEncrypt(password),
          userType: userType,
          orgID: orgID
        });

        let _user = await user.save();
        user_id = encryptMethod.IDEncrypt(_user._id);
      }
      return user_id;
    } else return false;
  };

  this.userLogin = async function(userName, password) {
    let result = [];
    password = encryptMethod.hashEncrypt(password);
    await User.findOne({ userName: userName }, function(err, user) {
      if (err) console.log(err);
      else if (password === user.password)
        result.push(encryptMethod.IDEncrypt(user._id), user.userType);
      else result = false;
    });
    return result;
  };

  this.getUserInformation = async function(_idUser) {
    let info = [];
    await User.findById(encryptMethod.IDDecrypt(_idUser), function(err, user) {
      if (err) return console.err(err);
      info.push(_idUser, user);
    });
    return info;
  };

  this.userRegisterDevice = async function(_idUser, deviceName) {
    let device = new Device({
      deviceToken: idProducer.produceDeviceID(),
      deviceName: deviceName,
      _idUser: encryptMethod.IDDecrypt(_idUser)
    });

    //生成url

    let result = [];
    let _device = await device.save();
    result.push(_idUser, encryptMethod.IDEncrypt(_device._id));
    return result;
  };

  this.userCheckDevice = async function(_idUser) {
    let result = [];
    await Device.findOne(
      { _idUser: encryptMethod.IDDecrypt(_idUser) },
      function(err, device) {
        if (err) result.push(_idUser, "no device");
        if (device)
          result.push(
            _idUser,
            encryptMethod.IDEncrypt(device._id),
            device.deviceName
          );
      }
    );
    return result;
  };

  //直接在边缘节点上获取
  this.memberGetDataFromDevice = function() {};

  this.userCancelDevice = async function(_idUser, _idDevice) {
    let result = [];
    await Device.findOneAndRemove(
      { _id: encryptMethod.IDDecrypt(_idDevice) },
      function(err, device) {
        if (err) return console.err(err);
        result.push(_idUser, _idDevice);
      }
    );
    return result;
  };

  //展示学生可选的组织（不一定需要）
  this.showOrganizationsToMember = function(_idMember) {};

  //学生改变组织（不一定需要）
  this.memberChangeOrganization = function(
    _idMember,
    originalOrgID,
    newOrgID
  ) {};

  //展示学生在组织中已经选择的老师
  this.showTeachersChosen = async function(_idMember) {
    let teacher_chosen_ids = [];
    await Employment.find(
      { _idMember: encryptMethod.IDDecrypt(_idMember) },
      "_idTeacher",
      function(err, _ids) {
        if (err) teacher_chosen_ids = [];
        else teacher_chosen_ids = _ids;
      }
    );

    let teachers_chosen = [];
    for (let i = 0; i < teacher_chosen_ids.length; i++) {
      await User.findById(teacher_chosen_ids[i], function(err, user) {
        teachers_chosen.push(user);
      });
    }
    let result = [];
    result.push(_idMember, teachers_chosen);
    return result;
  };

  //展示学生在该组织中可选的老师
  this.showTeachersNotChosen = async function(_idMember, orgID) {
    let teacher_chosen_ids = [];
    await Employment.find(
      { _idMember: encryptMethod.IDDecrypt(_idMember) },
      "_idTeacher",
      function(err, _ids) {
        if (err) teacher_chosen_ids = [];
        else teacher_chosen_ids = _ids;
      }
    );

    let teachers_all = [];
    await User.find({ orgID: orgID, type: "teacher" }, function(err, users) {
      if (err) return console.err(err);
      teachers_all = users;
    });

    let teachers = [];
    for (let i = 0; i < teachers_all.length; i++) {
      let isChosen = false;
      for (let j = 0; j < teacher_chosen_ids.length; j++) {
        if (teachers_all[i]._id === teacher_chosen_ids[j]) {
          isChosen = true;
          break;
        }
      }

      if (!isChosen) {
        teachers.push(teachers_all[i]);
      }
    }
    let result = [];
    result.push(_idMember, teachers);
    return result;
  };

  this.memberEmployTeacher = async function(_idMember, _idTeacher) {
    let employment = new Employment({
      _idMember: encryptMethod.IDEncrypt(_idMember),
      _idTeacher: encryptMethod.IDEncrypt(_idTeacher)
    });

    //为这位老师添加ac

    //首先是配置文件

    let _employment = await employment.save();
    let result = _idMember;
    return result;
  };

  this.memberUnemployTeacher = async function(_idMember, _idTeacher) {
    //将这条ac变为无效或者删除

    let result = "";
    await Employment.findOneAndRemove(
      {
        _idMember: encryptMethod.IDDecrypt(_idMember),
        _idTeacher: encryptMethod.IDDecrypt(_idTeacher)
      },
      function(err, employment) {
        if (err) return console.err(err);
        result = _idMember;
      }
    );
    return result;
  };

  //老师查看其所带的学生
  this.teacherCheckMembers = async function(_idTeacher) {
    let result = [];
    await Employment.find(
      { _idTeacher: encryptMethod.IDDecrypt(_idTeacher) },
      "_idMember",
      function(err, ids) {
        if (err) result.push(_idTeacher, "no student");
        else result.push(_idTeacher, ids);
      }
    );
    return result;
  };

  //首先确定其权限是否够资格，然后再记录这个操作
  this.teacherGetDataOfMember = function() {};
}

module.exports = UserService;
