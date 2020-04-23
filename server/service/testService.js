const DB = require("./../utils/db");
let connection = DB.getConnection();

let User = require("./../models/userSchema");
let user = new User({
  userID: "12345",
  userName: "testUser",
  password: "testPassword",
  userType: "teacher"
});
console.log(user.getUserName());
user.setUserName("newTestName");
console.log(user.getUserName());

user.save(function(err, user) {
  if (err) return console.error(err);
  console.log("save successfully");
});

User.find(function(err, users) {
  if (err) return console.error(err);
  console.log(users);
});

User.findOne({ userID: "12345" }, function(err, user) {
  if (err) return console.err(err);
  console.log(user.getUserName());
});

User.findOneAndUpdate(
  { userID: "12345" },
  { $set: { userName: "newnewUsername", password: "newPassword" } },
  function(err, user) {
    if (err) return console.err(err);
    console.log(user);
  }
);

User.findOne({ userID: "12345" }, function(err, user) {
  if (err) return console.err(err);
  console.log(user);
});

User.findOneAndRemove({ userID: "12345" }, function(err, user) {
  if (err) return console.err(err);
  console.log(user);
});

User.findOne({ userID: "12345" }, function(err, user) {
  if (err) return console.err(err);
  console.log(user);
});
