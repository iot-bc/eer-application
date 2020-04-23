/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午7:18
 * @Filename: db.js
 * @Function: connect to mongodb
 */

const mongoose = require("mongoose");
const config = require("./../config/database/database.config");
const URL = config.url + config.database;
const OPTIONS = config.options;

// function DB(){
//   this.getConnection = function(){
//     mongoose.connect(URL, OPTIONS);
//     mongoose.connection
//     .on("connected", () => {
//       console.log("Mongoose connection open to " + URL);
//     })
//     .on("error", err => {
//       console.error("Mongoose connection error: " + err);
//     })
//     .on("disconnected", () => {
//       console.log("Mongoose connection disconnected");
//     });
//   return mongoose.connection;
//   };
// };

// module.exports = DB;

module.exports.getConnection = function() {
  mongoose.connect(URL, OPTIONS);
  mongoose.connection
    .on("connected", () => {
      console.log("Mongoose connection open to " + URL);
    })
    .on("error", err => {
      console.error("Mongoose connection error: " + err);
    })
    .on("disconnected", () => {
      console.log("Mongoose connection disconnected");
    });
  return mongoose.connection;
};

// mongoose
//   .connect("mongoose://localhost/playground", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("Database connected!"))
//   .catch(err => console.log(err, "Database connect error"));
