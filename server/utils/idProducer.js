function IDproducer() {
  var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  this.produceUserID = function() {
    var userID = "U";
    for (var i = 0; i < 5; i++) {
      userID = userID + chars[Math.round(Math.random() * 10)];
    }

    return userID;
  };

  this.produceDeviceID = function() {
    var deviceID = "D";
    for (var i = 0; i < 5; i++) {
      deviceID = deviceID + chars[Math.round(Math.random() * 10)];
    }

    return deviceID;
  };
}

module.exports = IDproducer;
