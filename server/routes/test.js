/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午7:59
 * @Filename: test.js
 * @Function: do nothing >_>
 */
const express = require("express");
const router = express.Router();

const TestModel = require("./../models/testSchema");

/* GET users listing. */
router.get("/", function(req, res, next) {
  // let test1 = new TestModel({
  //   name: "test1",
  //   bool: false,
  //   count: 1
  // });
  // let test2 = new TestModel({
  //   name: "test2",
  //   bool: false,
  //   count: 122
  // });
  let test3 = new TestModel({
    name: "test3",
    bool: true,
    count: 12222
  });

  // test1.save(function(err, res) {
  //   if (err) {
  //     console.log("Error:" + err);
  //   } else {
  //     console.log("Res:" + res);
  //   }
  // });
  // test2.save(function(err, res) {
  //   if (err) {
  //     console.log("Error:" + err);
  //   } else {
  //     console.log("Res:" + res);
  //   }
  // });
  // test3.save(function(err, res) {
  //   if (err) {
  //     console.log("Error:" + err);
  //   } else {
  //     console.log("Res:" + res);
  //   }
  // });
  test3.testLog();
  TestModel.findAll(function(err, results) {
    if (err) next();
    console.log(`size: ${results.length}`);
    res.send(results);
  });
});

module.exports = router;
