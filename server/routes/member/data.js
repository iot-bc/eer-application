/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午3:32
 * @Filename: data.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

router.get("/", function(req, res, next) {
  // logic process
  if (req.body) next();
  res.json(req.originalUrl);
});

module.exports = router;
