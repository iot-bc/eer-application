/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午7:18
 * @Filename: db.js
 * @Function: do nothing >_>
 */

const mongodb = require("mongoose");

mongodb
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err, "Database connect error"));
