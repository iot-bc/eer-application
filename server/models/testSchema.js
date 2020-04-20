/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午9:47
 * @Filename: testSchema.js
 * @Function: do nothing >_>
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let testSchema = new Schema({
  name: String,
  date: { type: Date, default: Date.now() },
  bool: Boolean,
  count: Number
});

testSchema.methods.testLog = function() {
  console.log(this.date);
};

testSchema.statics.findAll = function(cb) {
  return this.find(cb);
};

const TestModel = mongoose.model("Test", testSchema);
module.exports = TestModel;
