const crypto = require("crypto");
const hash = crypto.createHash("md5");

module.exports = function(password) {
  hash.update(password);
  return password;
};
