/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:42
 * @Filename: ac.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

class AccessControl extends State {
  constructor(obj) {
    super(AccessControl.getClass(), []);
    Object.assign(this, obj);
  }

  static getClass() {
    return "org.eer.ac";
  }
}

module.exports = AccessControl;
