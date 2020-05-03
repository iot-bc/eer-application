const connect = require("./../utils/db");
connect();

const EncryptMethod = require("./../utils/encryptMethod");
const encryptMethod = new EncryptMethod();

let User = require("./../models/userSchema");
let user = new User({
  userName: "testUser2",
  password: "testPassword2",
  userType: "teacher"
});

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
