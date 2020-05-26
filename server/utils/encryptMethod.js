const CryptoJS = require("crypto-js");

function EncryptMethod() {
  //输入密码运用hash加密，不可逆，只能加密不能解密
  this.hashEncrypt = function(password) {
    let password_hashEncrypt = CryptoJS.MD5(password).toString();
    return password_hashEncrypt;
  };

  //这里ID的加密运用AES加密方法，可逆，可以加密然后解密
  this.IDEncrypt = function(_id) {
    _id = _id + "";
    let key = "0123456789abcdef";
    let iv = "0123456789abcdef";

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    let _id_Encrypted = CryptoJS.AES.encrypt(_id, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    return _id_Encrypted;
  };

  this.IDDecrypt = function(_id_Encrypted) {
    let key = "0123456789abcdef";
    let iv = "0123456789abcdef";

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    let _id = CryptoJS.AES.decrypt(_id_Encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    _id = CryptoJS.enc.Utf8.stringify(_id);

    return _id;
  };
}

module.exports = EncryptMethod;
