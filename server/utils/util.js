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

function transferDate(date) {
  return date
    .toJSON()
    .replace(/[a-zA-Z]/, " ")
    .split(".")[0];
}

module.exports = {
  firstToUpperCase,
  transferDate
};
