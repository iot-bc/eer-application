/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:41
 * @Filename: url.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

class UniformResourceLocator extends State {
  constructor(obj) {
    super(UniformResourceLocator.getClass(), []);
    Object.assign(this, obj);
  }

  static getClass() {
    return "org.eer.url";
  }
}

module.exports = UniformResourceLocator;
