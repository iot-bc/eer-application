/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/27 下午12:08
 * @Filename: util.js
 * @Function: do nothing >_>
 */

function firstToUpperCase(str) {
  if (str) {
    return str.replace(str[0], str[0].toUpperCase());
  }
  return str;
}

module.exports = {
  firstToUpperCase
};
