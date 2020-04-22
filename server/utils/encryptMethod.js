const crypto = require("crypto");
const hash = crypto.createHash("md5");

function EncryptMethod() {
  this.hashEncrypt = function(password) {
    var password_hashEncrypt = hash.update(password);

    console.log(password_hashEncrypt);

    return password_hashEncrypt;
  };
}

module.exports = EncryptMethod;
