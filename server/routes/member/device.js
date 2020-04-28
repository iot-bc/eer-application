/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/24 下午7:42
 * @Filename: device.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router
  .route("/")
  .all(function(req, res, next) {
    console.log(req.originalUrl);
    next();
  })
  .get(function(req, res, next) {
    // logic process
    if (req.url === null) next();
    res.send({ device: "laoge's device" });
  })
  .post(function(req, res, next) {
    if (!req.body) next();
    res.send({ device: "laoge's device been updated", msg: req.body });
  })
  // .put(function(req, res, next) {
  //   if (req.url === null) next();
  //   res.send({ device: "laoge's devicessss" });
  // })
  .delete(function(req, res, next) {
    if (req.url === null) next();
    res.send({ device: "laoge's devicessss" });
  });

module.exports = router;
