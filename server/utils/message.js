/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/25 下午10:16
 * @Filename: message.js
 * @Function: 返回给前端的消息格式
 */

class Message {
  code = true;
  data = null;
  msg = "";

  constructor(code, data, msg) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }

  setSuccess() {
    this.code = true;
  }

  setFail() {
    this.code = false;
  }
}
module.exports = Message;
