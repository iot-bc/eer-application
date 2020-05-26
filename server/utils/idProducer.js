const User = require("./../models/userSchema");
const Device = require("./../models/deviceSchema");

function IDproducer() {
  this.produceTeacherID = function() {
    let newID = getRamdomID("Tea");

    // while(true){
    //   User.findOne({userID: newID}, function(err, user){
    //     if (user) {
    //       newID = getRamdomID("Tea");
    //     }
    //     else break;
    //   });
    // }
    return newID;
  };

  this.produceDeviceID = function() {
    let newID = getRamdomID("Dev");

    // while(true){
    //   User.findOne({userID: newID}, function(err, user){
    //     if (user) {
    //       newID = getRamdomID("Dev");
    //     }
    //     else break;
    //   });
    // }
    return newID;
  };

  function getRamdomID(ID) {
    let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < 5; i++) {
      ID = ID + chars[Math.floor(Math.random() * 10)];
    }
  }
}

module.exports = IDproducer;
