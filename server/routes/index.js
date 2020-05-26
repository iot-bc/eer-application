/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/28 下午2:47
 * @Filename: index.js
 * @Function: do nothing >_>
 */

const router = require("express").Router();

const loginRouter = require("./login");
const registerRouter = require("./register");
const adminRouter = require("./admin");
const memberRouter = require("./member");
const teacherRouter = require("./teacher");

let testRouter = require("./test");

function storeLocal(param) {
  return function(req, res, next) {
    res.locals[param] = req.params[param];
    next();
  };
}

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/admin", adminRouter);
router.use(
  "/member/:memberID",
  function(req, res, next) {
    console.log("      +++ " + req.url);
    next();
  },
  storeLocal("memberID"),
  memberRouter
);
router.use("/teacher/:teacherID", storeLocal("teacherID"), teacherRouter);

router.use("/test", testRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
  next();
});

module.exports = router;
