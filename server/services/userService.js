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

                await user.save(function(err, user) {
                    if (err) return console.error(err);
                    console.log("save successfully");
                    user_id = encryptMethod.IDEncrypt(user._id);
                });
            } else {
                let user = new User({
                    userName: userName,
                    password: encryptMethod.hashEncrypt(password),
                    userType: userType,
                    orgID: orgID
                });

                await user.save(function(err, user) {
                    if (err) return console.error(err);
                    console.log("save successfully");
                    user_id = encryptMethod.IDEncrypt(user._id);
                });
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

        //注册设备
        let device_url = "http://120.26.172.10:48081/api/v1/device";
        let newDevice = {
            "name":device.deviceToken,
            "description":"负责监控和采集学生的部分生理数据和运动情况数据",
            "adminState":"unlocked",
            "operatingState":"enabled",
            "protocols":{"device protocol":{"device address":"device " + device.deviceToken}},
            "labels": ["health","counter"],
            "location":"",
            "service":{"name":"GraduationDesignSystem control device service"},
            "profile":{"name":"device monitor profile"}
        };
        postData(device_url, newDevice);


        let result = [];
        await device.save(function(err, device) {
            if (err) return console.err(err);
            console.log("save successfully");
            result.push(_idUser, encryptMethod.IDEncrypt(device._id));
        });
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
    this.memberGetDataFromDevice = function(_deviceToken) {

        //通过这个url 可以获取相应设备的数据
        //末尾的数字1代表这个设备最近的一条记录。可以改为n, 即最近的n条记录
        const url = "http://120.26.172.10:48080/api/v1/event/device/" + _deviceToken + "/1";

        let http = require('http');
        let result = {};
        http.get(url, function (res) {
            let data = '';
            res.on('data', function (d) {
                data += d;
            });
            res.on('end', function () {
                result = JSON.parse(data);
                console.log(result);
            });
        }).on('error', function (e) {
            console.error(e);
        });

        return result;
    };

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
        let result = "";
        let employment = new Employment({
            _idMember: encryptMethod.IDEncrypt(_idMember),
            _idTeacher: encryptMethod.IDEncrypt(_idTeacher)
        });

        //为这位老师添加ac

        //首先是配置文件

        await employment.save(function(err, employment) {
            if (err) return console.err(err);
            console.log("save successfully");
            result = _idMember;
        });
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


function postData(url, body) {
    let request = require('request');
    let data = {
        headers: {"Connection": "close"},
        url: url,
        method: 'POST',
        json:true,
        body: data
    };
    request(data, callback);
}


function callback(error, response, data) {
    if (!error && response.statusCode === 200) {
        console.log('----info------',data);
    }
}

module.exports = UserService;
