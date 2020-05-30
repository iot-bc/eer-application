const EncryptMethod = require("./../utils/encryptMethod");
const encryptMethod = new EncryptMethod();

const User = require("./../models/userSchema");
const Device = require("./../models/deviceSchema");
const Employment = require("./../models/employmentSchema");
const Organization = require("./../models/organizationSchema");

const axios = require("axios");

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

    let _device = await device.save();
    let device_url = "http://120.26.172.10:48081/api/v1/device";
    let newDevice = {
      name: _device._id,
      description: "负责监控和采集学生的部分生理数据和运动情况数据",
      adminState: "unlocked",
      operatingState: "enabled",
      protocols: {
        "device protocol": { "device address": "device " + _device._id }
      },
      labels: ["health", "counter"],
      location: "",
      service: { name: "GraduationDesignSystem control device service" },
      profile: { name: "device monitor profile" }
    };
    postData(device_url, newDevice);
    let result = [];
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
  this.memberGetDataFromDevice = async function(_idUser) {
    //通过这个url 可以获取相应设备的数据
    //末尾的数字1代表这个设备最近的一条记录。可以改为n, 即最近的n条记录
    let _deviceID = "";
    await Device.findOne(
      { _idUser: encryptMethod.IDDecrypt(_idUser) },
      function(err, device) {
        if (err) return console.log(err);
        _deviceID = device._id + "";
      }
    );

    let heartRate = 70,
      temperature = 36.7,
      stepNumber = 0,
      climbHeight = 0,
      calorie = 0.0,
      systolicPressure = 120,
      diastolicPressure = 80;

    let counter = 0;

    // 每隔10s生成一次数据
    while (counter <= 10) {
      counter++;
      let url = "http://120.26.172.10:48080/api/v1/event";
      let data = {
        device: _deviceID,
        readings: [
          { name: "heartrate", value: heartRate },
          { name: "temperature", value: temperature },
          { name: "stepnumber", value: stepNumber },
          { name: "climbheight", value: climbHeight },
          { name: "calorie", value: calorie },
          { name: "systolicpressure", value: systolicPressure }, // 血压的收缩压
          { name: "diastolicpressure", value: diastolicPressure } // 血压的舒张压
        ]
      };

      postData(url, data);

      sleep(1000 * 15);

      heartRate = Math.floor(Math.random() * (110 - 75)) + 75; // 心率在70到110之间波动

      temperature = Math.random() * (37.5 - 36.2) + 36.2; // 温度36.2到37.5之间波动
      temperature = temperature.toFixed(1);

      stepNumber += Math.floor(Math.random() * 7); // 每隔10秒增加7以内的随机步数

      climbHeight += Math.floor(Math.random());

      calorie += Math.floor(Math.random() * 11);

      systolicPressure = Math.floor(Math.random() * (120 - 100)) + 100; // 收缩压在100到120之间波动

      diastolicPressure = Math.floor(Math.random() * (80 - 60)) + 60; // 舒张压在60到80之间波动
    }

    const url =
      "http://120.26.172.10:48080/api/v1/event/device/" + _deviceID + "/8";

    return await axios.get(url).then(res => {
      let list = [];
      res.data.forEach(data => {
        let obj = {};
        data["readings"].forEach(item => {
          obj[item["name"]] = item["value"];
        });
        list.push(obj);
      });
      let result = {
        steps: list[0]["stepnumber"],
        layers: list[0]["climbheight"],
        calorie: list[0]["calorie"],
        heartRates: [],
        temperatures: [],
        systolicPressureList: [],
        diastolicPressureList: []
      };

      list.reverse().forEach(item => {
        result.heartRates.push(item["heartrate"]);
        result.temperatures.push(item["temperature"]);
        result.systolicPressureList.push(item["systolicpressure"]);
        result.diastolicPressureList.push(item["diastolicpressure"]);
      });
      return result;
    });
  };

  this.userCancelDevice = async function(_idUser) {
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

  this.memberEmployTeacher = async function(_idMember, _idTeacher) {
    let employment = new Employment({
      _idMember: encryptMethod.IDDecrypt(_idMember),
      _idTeacher: _idTeacher
    });
    let _employment = await employment.save();
    let result = _idMember;
    return result;
  };

  this.memberUnemployTeacher = async function(_idMember, _idTeacher) {
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
  this.teacherGetDataOfMember = async function(_idTeacher, _idMember) {
    let _deviceID = "";
    await Device.findOne(
      { _idUser: encryptMethod.IDDecrypt(_idMember) },
      function(err, device) {
        if (err) return console.log(err);
        _deviceID = device._id + "";
      }
    );

    let heartRate = 70,
      temperature = 36.7,
      stepNumber = 0,
      climbHeight = 0,
      calorie = 0.0,
      systolicPressure = 120,
      diastolicPressure = 80;

    let counter = 0;

    while (counter <= 10) {
      counter++;
      let url = "http://120.26.172.10:48080/api/v1/event";
      let data = {
        device: _deviceID,
        readings: [
          { name: "heartrate", value: heartRate },
          { name: "temperature", value: temperature },
          { name: "stepnumber", value: stepNumber },
          { name: "climbheight", value: climbHeight },
          { name: "calorie", value: calorie },
          { name: "systolicpressure", value: systolicPressure }, // 血压的收缩压
          { name: "diastolicpressure", value: diastolicPressure } // 血压的舒张压
        ]
      };

      postData(url, data);

      sleep(1000 * 15);

      heartRate = Math.floor(Math.random() * (110 - 75)) + 75; // 心率在70到110之间波动

      temperature = Math.random() * (37.5 - 36.2) + 36.2; // 温度36.2到37.5之间波动
      temperature = temperature.toFixed(1);

      stepNumber += Math.floor(Math.random() * 7); // 每隔10秒增加7以内的随机步数

      climbHeight += Math.floor(Math.random());

      calorie += Math.floor(Math.random() * 11);

      systolicPressure = Math.floor(Math.random() * (120 - 100)) + 100; // 收缩压在100到120之间波动

      diastolicPressure = Math.floor(Math.random() * (80 - 60)) + 60; // 舒张压在60到80之间波动
    }

    const url =
      "http://120.26.172.10:48080/api/v1/event/device/" + _deviceID + "/8";

    return await axios.get(url).then(res => {
      let list = [];
      res.data.forEach(data => {
        let obj = {};
        data["readings"].forEach(item => {
          obj[item["name"]] = item["value"];
        });
        list.push(obj);
      });
      let result = {
        steps: list[0]["stepnumber"],
        layers: list[0]["climbheight"],
        calorie: list[0]["calorie"],
        heartRates: [],
        temperatures: [],
        systolicPressureList: [],
        diastolicPressureList: []
      };

      list.reverse().forEach(item => {
        result.heartRates.push(item["heartrate"]);
        result.temperatures.push(item["temperature"]);
        result.systolicPressureList.push(item["systolicpressure"]);
        result.diastolicPressureList.push(item["diastolicpressure"]);
      });
      return result;
    });
  };
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

function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1);
      } catch (e) {
        reject(0);
      }
    }, delay);
  });
}

module.exports = UserService;
