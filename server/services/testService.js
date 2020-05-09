const connect = require("./../utils/db");
connect();

const EncryptMethod = require("./../utils/encryptMethod");
const encryptMethod = new EncryptMethod();

const CryptoJS = require("crypto-js");

let User = require("./../models/userSchema");
let user = new User({
  userName: "testUser2",
  password: "testPassword2",
  userType: "teacher"
});

// var str = '123456';
// // 密钥 16 位
// var key = '0123456789abcdef';
// // 初始向量 initial vector 16 位
// var iv = '0123456789abcdef';
// // key 和 iv 可以一致

// key = CryptoJS.enc.Utf8.parse(key);
// iv = CryptoJS.enc.Utf8.parse(iv);

// var encrypted = CryptoJS.AES.encrypt(str, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
// });

// // 转换为字符串
// encrypted = encrypted.toString();

// console.log(encrypted);

// // mode 支持 CBC、CFB、CTR、ECB、OFB, 默认 CBC
// // padding 支持 Pkcs7、AnsiX923、Iso10126
// // NoPadding、ZeroPadding, 默认 Pkcs7, 即 Pkcs5

// // 解密
// var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
// });

// // 转换为 utf8 字符串
// decrypted = CryptoJS.enc.Utf8.stringify(decrypted);

// console.log(decrypted);

// let _id_Encrypted = CryptoJS.AES.encrypt("12345678", "secret-key").toString();
// console.log(_id_Encrypted);

// let _id = CryptoJS.AES.decrypt(_id_Encrypted, "secret-key").toString();

// console.log(_id);

// let key = CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM");

// let plaintText = 'ABCDEFGH'; // 明文

// let encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
// 	mode: CryptoJS.mode.ECB,
// 	padding: CryptoJS.pad.Pkcs7
// });

//     console.log("加密前："+plaintText);
//     console.log("加密后："+encryptedData);

// user.save(function(err, user) {
//   if (err) return console.error(err);
//   console.log("save successfully");
//   console.log(user);
// });

// User.find(function(err, users) {
//   if (err) return console.error(err);
//   console.log(users);
// });

// User.findOne({ userName: "testUser2" }, function(err, user) {
//   if (err) return console.err(err);
//   let id = user._id;
//   console.log(id);
// });

// User.findOneAndUpdate(
//   { userID: "12345" },
//   { $set: { userName: "newnewUsername", password: "newPassword" } },
//   function(err, user) {
//     if (err) return console.err(err);
//     console.log(user);
//   }
// );

// User.findOne({ userID: "12345" }, function(err, user) {
//   if (err) return console.err(err);
//   console.log(user);
// });

// User.findOneAndRemove({ userID: "12345" }, function(err, user) {
//   if (err) return console.err(err);
//   console.log(user);
// });

// User.findOne({ userID: "12345" }, function(err, user) {
//   if (err) return console.err(err);
//   if (user) return console.log("exist");
//   else return console.log("non-exist");
// });

// User.findById("5eae4985915ba1a1be15ac9f", function(err, user){
// 	if(err) return console.err(err);
// 	console.log(user.getUserName());
// });
