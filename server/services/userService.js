const EncryptMethod = require("./../utils/encryptMethod");
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
      if (err) return console.log(err);
      else if (user) isRegistered = true;
    });

    if (isRegistered === false) {
      if (userType === "teacher") {
        let user = new User({
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
      if (err) return console.log(err);
      else if (!user) result = false;
      else if (password === user.password)
        result.push(encryptMethod.IDEncrypt(user._id), user.userType);
      else result = false;
    });
    return result;
  };

  this.getUserInformation = async function(_idUser) {
    let info = [];
    await User.findById(encryptMethod.IDDecrypt(_idUser), function(err, user) {
      if (err) return console.log(err);
      info.push(_idUser, user);
    });
    return info;
  };

  this.userRegisterDevice = async function(_idUser, deviceName) {
    let device = new Device({
      deviceName: deviceName,
      _idUser: encryptMethod.IDDecrypt(_idUser)
    });

    //生成url
    //注册设备
    let device_url = "http://120.26.172.10:48081/api/v1/device";
    let newDevice = {
      name: device._id,
      description: "负责监控和采集学生的部分生理数据和运动情况数据",
      adminState: "unlocked",
      operatingState: "enabled",
      protocols: {
        "device protocol": { "device address": "device " + device._id }
      },
      labels: ["health", "counter"],
      location: "",
      service: { name: "GraduationDesignSystem control device service" },
      profile: { name: "device monitor profile" }
    };
    postData(device_url, newDevice);

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
        if (err) return console.log(err);
        else if (!device) result.push(_idUser, "no device");
        else if (device)
          result.push(
            _idUser,
            encryptMethod.IDEncrypt(device._id),
            device.deviceName,
            device.date
          );
      }
    );
    return result;
  };

  //直接在边缘节点上获取
  this.memberGetDataFromDevice = function(_deviceID) {
    //通过这个url 可以获取相应设备的数据
    //末尾的数字1代表这个设备最近的一条记录。可以改为n, 即最近的n条记录
    _deviceID = encryptMethod.IDDecrypt(_deviceID); //看看是否需要
    const url =
      "http://120.26.172.10:48080/api/v1/event/device/" + _deviceID + "/1";

    let http = require("http");
    let result = {};
    http
      .get(url, function(res) {
        let data = "";
        res.on("data", function(d) {
          data += d;
        });
        res.on("end", function() {
          result = JSON.parse(data);
          console.log(result);
        });
      })
      .on("error", function(e) {
        console.log(e);
      });

    return result;
  };

  this.userCancelDevice = async function(_idUser) {
    //直接一个参数
    let _idDevice = "";
    await Device.findOne(
      { _idUser: encryptMethod.IDDecrypt(_idUser) },
      function(err, device) {
        if (err) return console.log(err);
        _idDevice = "" + device._id;
      }
    );

    // 在EdgeX上删除设备
    let request = require("request");
    const url = "http://120.26.172.10:48081/api/v1/device/name/" + _idDevice; // 通过id删除设备
    let options = { url: url };
    request.del(options, function(err, response, body) {
      console.info(response.body);
    });

    let result = [];
    await Device.findOneAndRemove(
      { _idUser: encryptMethod.IDDecrypt(_idUser) },
      function(err, device) {
        if (err) return console.log(err);
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

  this.showTeachers = async function(_idMember) {
    let orgID = "";
    await User.findById(encryptMethod.IDDecrypt(_idMember), function(
      err,
      user
    ) {
      if (err) return console.log(err);
      orgID = user.orgID;
    });

    let teachers = [];
    await User.find({ orgID: orgID, userType: "teacher" }, function(
      err,
      users
    ) {
      if (err) return console.log(err);
      teachers = users;
    });

    let teacherList = [];
    teachers.forEach(teacher => {
      let id = teacher._id + "";
      Employment.find({ _idTeacher: id }, function(err, employments) {
        if (err) return console.log(err);
        teacherList.push({
          id: id,
          teacherName: teacher["userName"],
          desc: `Teacher ${teacher["userName"]}'s course`,
          memberNum: employments.length,
          status: true,
          chosen: false
        });
      });
    });

    let teacher_chosen_ids = [];
    await Employment.find(
      { _idMember: encryptMethod.IDDecrypt(_idMember) },
      "_idTeacher",
      function(err, ids) {
        if (err) return console.log(err);
        teacher_chosen_ids = ids;
      }
    );
    console.log(teacher_chosen_ids);

    for (let i = 0; i < teacherList.length; i++) {
      for (let j = 0; j < teacher_chosen_ids.length; j++) {
        let id = teacherList[i].id + "";
        if (id === teacher_chosen_ids[j]["_idTeacher"]) {
          teacherList[i].chosen = true;
        }
      }
    }
    return teacherList;
  };

  // //展示学生在组织中已经选择的老师
  // this.showTeachersChosen = async function(_idMember) {
  //   let teacher_chosen_ids = [];
  //   await Employment.find(
  //     { _idMember: encryptMethod.IDDecrypt(_idMember) },
  //     "_idTeacher",
  //     function(err, _ids) {
  //       if (err) teacher_chosen_ids = [];
  //       else teacher_chosen_ids = _ids;
  //     }
  //   );

  //   let teachers_chosen = [];
  //   for (let i = 0; i < teacher_chosen_ids.length; i++) {
  //     await User.findById(teacher_chosen_ids[i], function(err, user) {
  //       teachers_chosen.push(user);
  //     });
  //   }
  //   let result = [];
  //   result.push(_idMember, teachers_chosen);
  //   return result;
  // };

  // //展示学生在该组织中可选的老师
  // this.showTeachersNotChosen = async function(_idMember, orgID) {
  //   let teacher_chosen_ids = [];
  //   await Employment.find(
  //     { _idMember: encryptMethod.IDDecrypt(_idMember) },
  //     "_idTeacher",
  //     function(err, _ids) {
  //       if (err) teacher_chosen_ids = [];
  //       else teacher_chosen_ids = _ids;
  //     }
  //   );

  //   let teachers_all = [];
  //   await User.find({ orgID: orgID, type: "teacher" }, function(err, users) {
  //     if (err) return console.err(err);
  //     teachers_all = users;
  //   });

  //   let teachers = [];
  //   for (let i = 0; i < teachers_all.length; i++) {
  //     let isChosen = false;
  //     for (let j = 0; j < teacher_chosen_ids.length; j++) {
  //       if (teachers_all[i]._id === teacher_chosen_ids[j]) {
  //         isChosen = true;
  //         break;
  //       }
  //     }

  //     if (!isChosen) {
  //       teachers.push(teachers_all[i]);
  //     }
  //   }
  //   let result = [];
  //   result.push(_idMember, teachers);
  //   return result;
  // };

  this.memberEmployTeacher = async function(_idMember, _idTeacher) {
    let employment = new Employment({
      _idMember: encryptMethod.IDDecrypt(_idMember),
      _idTeacher: _idTeacher
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
        _idTeacher: _idTeacher
      },
      function(err, employment) {
        if (err) return console.log(err);
        result = _idMember;
      }
    );
    return result;
  };

  //老师查看其所带的学生
  this.teacherCheckMembers = async function(_idTeacher) {
    let _ids = [];
    let sign = false;
    let students = [];
    await Employment.find(
      { _idTeacher: encryptMethod.IDDecrypt(_idTeacher) },
      "_idMember",
      function(err, ids) {
        if (err) return console.log(err);
        else if (!ids) sign = true;
        else _ids = ids;
      }
    );
    if (sign) return [];
    else {
      for (let i = 0; i < _ids.length; i++) {
        await User.findById(_ids[i]._idMember, function(err, user) {
          students.push({
            id: encryptMethod.IDEncrypt(user["_id"]),
            name: user["userName"]
          });
        });
      }
      return students;
    }
  };

  //首先确定其权限是否够资格，然后再记录这个操作
  this.teacherGetDataOfMember = function() {};
}

function postData(url, body) {
  let request = require("request");
  let data = {
    headers: { Connection: "close" },
    url: url,
    method: "POST",
    json: true,
    body: body
  };
  request(data, callback);
}

function callback(error, response, data) {
  if (!error && response.statusCode === 200) {
    console.log("----info------", data);
  }
}

module.exports = UserService;
